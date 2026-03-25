import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecipeService } from '@core/services/recipe.service';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {
  public recipeService = inject(RecipeService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  
  public recipes = this.recipeService.recipes;
  public loading = this.recipeService.loading;

  ngOnInit() {
    this.recipeService.getRecipes();
  }

  async deleteRecipe(id: string) {
    const confirm = await this.alertService.confirm('¿Eliminar receta?', 'Esta acción no se puede deshacer');
    if (confirm) {
      this.recipeService.deleteRecipe(id).subscribe(success => {
        if (success) {
          this.alertService.toast('Receta eliminada');
          this.recipeService.getRecipes();
        }
      });
    }
  }
}
