import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientDto } from '@core/interfaces/inventory-item.interface';
import { IngredientService } from '@core/services/ingredient.service';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-ingredient',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredient.html',
  styleUrl: './ingredient.css',
})
export class Ingredient implements OnInit {
  private readonly ingredientService = inject(IngredientService);
  private readonly alertService = inject(AlertService);
  private readonly fb = inject(FormBuilder);

  public ingredients = this.ingredientService.ingredients;
  public loading = this.ingredientService.loading;
  public isFormVisible = signal(false);
  public editingIngredient = signal<IngredientDto | null>(null);

  public ingredientForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    category: [''],
    description: [''],
  });

  ngOnInit() {
    this.ingredientService.loadIngredients().subscribe();
  }

  addIngredient() {
    this.editingIngredient.set(null);
    this.ingredientForm.reset();
    this.isFormVisible.set(true);
  }

  editIngredient(ingredient: IngredientDto) {
    this.editingIngredient.set(ingredient);
    this.ingredientForm.patchValue({
      id: ingredient.id,
      name: ingredient.name,
      category: ingredient.category || '',
      description: ingredient.description || ''
    });
    this.isFormVisible.set(true);
  }

  closeForm() {
    this.isFormVisible.set(false);
    this.editingIngredient.set(null);
  }

  saveIngredient() {
    if (this.ingredientForm.invalid) return;

    const formData = this.ingredientForm.value;
    const ingredientData: Partial<IngredientDto> = {
      name: formData.name!,
      category: formData.category!,
      description: formData.description!,
    };

    const currentIngredient = this.editingIngredient();
    if (currentIngredient) {
      const updatedIngredient: IngredientDto = {
        ...currentIngredient,
        ...ingredientData,
      } as IngredientDto;
      this.ingredientService.updateIngredient(updatedIngredient).subscribe(() => {
        this.alertService.toast('Ingrediente actualizado');
        this.closeForm();
      });
    } else {
      this.ingredientService.addIngredient(ingredientData).subscribe(() => {
        this.alertService.toast('Ingrediente añadido');
        this.closeForm();
      });
    }
  }

  async deleteIngredient(id: string) {
    const confirmed = await this.alertService.confirm(
      '¿Eliminar ingrediente?',
      'Se eliminará de la lista de maestros.'
    );

    if (confirmed) {
      this.ingredientService.deleteIngredient(id).subscribe(() => {
        this.alertService.toast('Ingrediente eliminado', 'info');
      });
    }
  }
}
