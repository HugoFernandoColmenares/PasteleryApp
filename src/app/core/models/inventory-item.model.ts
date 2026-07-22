export interface IngredientDto {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

export interface InventoryItemDto {
  id: string;
  ingredientId: string;
  ingredient?: IngredientDto;
  quantity: number;
  unit: string;
  location?: string;
  lastUpdated: string;
}
