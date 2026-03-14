import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeService } from '@core/services/recipe.service';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {
  public recipeService = inject(RecipeService);
  public recipes = this.recipeService.recipes;
  public loading = this.recipeService.loading;

  ngOnInit() {
    this.recipeService.getRecipes();
  }
}
