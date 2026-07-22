import { ListRecipeDto, RecipeDto } from '@core/models/recipe.model';

export interface CartItem {
  recipe: RecipeDto | ListRecipeDto;
  quantity: number;
}

export interface StoredCartItem {
  recipeId: string;
  name: string;
  suggestedPrice: number;
  imageUrl?: string;
  quantity: number;
}

export const CART_STORAGE_KEY = 'pastelery_cart';
