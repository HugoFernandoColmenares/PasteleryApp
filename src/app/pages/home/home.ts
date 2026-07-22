import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RecipeService } from '@core/services/recipe.service';
import { Card } from '@shared/card/card';

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {
  private recipeService = inject(RecipeService);

  recipes = this.recipeService.recipes;
  loading = this.recipeService.loading;

  constructor() {
    this.recipeService.getRecipes();
  }
}
