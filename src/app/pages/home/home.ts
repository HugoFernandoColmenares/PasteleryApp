import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RecipeService } from '@core/services/recipe.service';
import { Card } from "@shared/card/card";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Card],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  recipes = this.recipeService.recipes;
  loading = this.recipeService.loading;

  constructor() {
    this.recipeService.getRecipes();
  }

  public recipe = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => {
        if (!id) return [null];
        return this.recipeService.getRecipeById(id);
      })
    )
  );
}
