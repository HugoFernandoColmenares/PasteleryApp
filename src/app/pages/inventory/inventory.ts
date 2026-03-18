import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryItemDto, IngredientDto } from '@core/interfaces/inventory-item.interface';
import { InventoryService } from '@core/services/inventory.service';
import { IngredientService } from '@core/services/ingredient.service';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
  private readonly inventoryService = inject(InventoryService);
  private readonly ingredientService = inject(IngredientService);
  private readonly alertService = inject(AlertService);
  private readonly fb = inject(FormBuilder);

  public ingredients = this.inventoryService.ingredients;
  public loading = this.inventoryService.loading;
  public isFormVisible = signal(false);
  public editingItem = signal<InventoryItemDto | null>(null);

  // Ingredient search logic
  public allIngredients = this.ingredientService.ingredients;
  public searchTerm = signal('');
  public showDropdown = signal(false);

  public filteredIngredients = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.allIngredients().filter(i => 
      i.name.toLowerCase().includes(term) || 
      i.category?.toLowerCase().includes(term)
    );
  });

  public inventoryForm = this.fb.group({
    id: ['' as string],
    ingredientId: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(0)]],
    unit: ['kg', Validators.required],
    location: [''],
  });

  ngOnInit() {
    this.inventoryService.loadIngredients();
    this.ingredientService.loadIngredients().subscribe();
  }

  getIngredientName(id: string) {
    return this.allIngredients().find(i => i.id === id)?.name || id;
  }

  addItem() {
    this.editingItem.set(null);
    this.searchTerm.set('');
    this.inventoryForm.reset({
      unit: 'kg',
      quantity: 0
    });
    this.isFormVisible.set(true);
  }

  editItem(item: InventoryItemDto) {
    this.editingItem.set(item);
    const ingredient = this.allIngredients().find(i => i.id === item.ingredientId);
    this.searchTerm.set(ingredient?.name || '');
    this.inventoryForm.patchValue({
      id: item.id,
      ingredientId: item.ingredientId,
      quantity: item.quantity,
      unit: item.unit,
      location: item.location || ''
    });
    this.isFormVisible.set(true);
  }

  closeForm() {
    this.isFormVisible.set(false);
    this.editingItem.set(null);
    this.showDropdown.set(false);
  }

  selectIngredient(ingredient: IngredientDto) {
    this.inventoryForm.patchValue({ ingredientId: ingredient.id });
    this.searchTerm.set(ingredient.name);
    this.showDropdown.set(false);
  }

  saveItem() {
    if (this.inventoryForm.invalid) return;

    const formData = this.inventoryForm.value;
    const itemData: Partial<InventoryItemDto> = {
      ingredientId: formData.ingredientId!,
      quantity: formData.quantity!,
      unit: formData.unit!,
      location: formData.location!,
    };

    const currentItem = this.editingItem();
    if (currentItem) {
      const updatedItem: InventoryItemDto = {
        ...currentItem,
        ...itemData,
      } as InventoryItemDto;
      this.inventoryService.updateIngredient(updatedItem).subscribe(() => {
        this.inventoryService.loadIngredients();
        this.alertService.toast('Item actualizado correctamente');
        this.closeForm();
      });
    } else {
      this.inventoryService.addIngredient(itemData).subscribe(() => {
        this.inventoryService.loadIngredients();
        this.alertService.toast('Nuevo item añadido');
        this.closeForm();
      });
    }
  }

  async deleteItem(id: string) {
    const confirmed = await this.alertService.confirm(
      '¿Eliminar item?',
      'Esta acción no se puede deshacer.'
    );

    if (confirmed) {
      this.inventoryService.deleteIngredient(id).subscribe(() => {
        this.inventoryService.loadIngredients();
        this.alertService.toast('Item eliminado', 'info');
      });
    }
  }
}
