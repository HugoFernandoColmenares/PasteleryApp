import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageLocationService } from '@core/services/storage-location.service';
import { AlertService } from '@core/services/alert.service';
import { StorageLocationDto, CreateStorageLocationDto } from '@core/interfaces/storage-location.interface';

@Component({
  selector: 'app-storage-locations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './storage-locations.html',
  styleUrl: './storage-locations.css',
})
export class StorageLocations implements OnInit {
  private locationService = inject(StorageLocationService);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);

  public locations = this.locationService.locations;
  public loading = this.locationService.loading;
  public isFormVisible = signal(false);
  public editingLocation = signal<StorageLocationDto | null>(null);

  public locationForm = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    this.locationService.loadLocations();
  }

  addLocation() {
    this.editingLocation.set(null);
    this.locationForm.reset();
    this.isFormVisible.set(true);
  }

  editLocation(location: StorageLocationDto) {
    this.editingLocation.set(location);
    this.locationForm.patchValue({
      name: location.name,
      code: location.code,
      description: location.description,
    });
    this.isFormVisible.set(true);
  }

  closeForm() {
    this.isFormVisible.set(false);
    this.editingLocation.set(null);
  }

  saveLocation() {
    if (this.locationForm.invalid) return;

    const formData = this.locationForm.value as CreateStorageLocationDto;

    if (this.editingLocation()) {
      const updated: StorageLocationDto = {
        ...this.editingLocation()!,
        ...formData,
      };
      this.locationService.updateLocation(updated.id, updated).subscribe(() => {
        this.locationService.loadLocations();
        this.alertService.toast('Ubicación actualizada');
        this.closeForm();
      });
    } else {
      this.locationService.createLocation(formData).subscribe(() => {
        this.locationService.loadLocations();
        this.alertService.toast('Nueva ubicación creada');
        this.closeForm();
      });
    }
  }

  async deleteLocation(id: string) {
    const confirm = await this.alertService.confirm('¿Eliminar?', 'Esta acción no se puede deshacer');
    if (confirm) {
      this.locationService.deleteLocation(id).subscribe(() => {
        this.locationService.loadLocations();
        this.alertService.toast('Ubicación eliminada');
      });
    }
  }
}
