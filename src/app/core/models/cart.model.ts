import { ListRecipeDto, RecipeDto } from '@core/models/recipe.model';

export interface CartItem {
  recipe: RecipeDto | ListRecipeDto;
  quantity: number;
}
