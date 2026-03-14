export interface ListRecipeDto {
  id: string;
  name: string;
  description: string;
  totalCost: number;
  suggestedPrice: number;
  imageUrl?: string;
}

export interface RecipeDto extends ListRecipeDto {
  instructions: string;
  recipeIngredients: RecipeIngredientDto[];
}

export interface RecipeIngredientDto {
  id: string;
  recipeId: string;
  ingredientId: string;
  amount: number;
  unit: string;
  ingredientName?: string;
}

export interface CreateRecipeDto {
  name: string;
  description: string;
  instructions: string;
  suggestedPrice: number;
  imageUrl: string;
  recipeIngredients: CreateRecipeIngredientDto[];
}

export interface CreateRecipeIngredientDto {
  ingredientId: string;
  amount: number;
  unit: string;
}
