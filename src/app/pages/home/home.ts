import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingHighlight } from '@core/models/landing.model';
import { RecipeService } from '@core/services/recipe.service';
import { Card } from '@shared/card/card';
import { StorageSrcDirective } from '@shared/directives/storage-src.directive';

@Component({
  selector: 'app-home',
  imports: [Card, RouterLink, StorageSrcDirective],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {
  private readonly recipeService = inject(RecipeService);

  readonly recipes = this.recipeService.recipes;
  readonly loading = this.recipeService.loading;
  readonly heroImage = 'recipes/hero.webp';

  readonly highlights = computed<LandingHighlight[]>(() => {
    const recipes = this.recipes();

    if (recipes.length === 0) {
      return [];
    }

    const lowestPrice = recipes.reduce(
      (lowest, recipe) => Math.min(lowest, recipe.suggestedPrice),
      Number.POSITIVE_INFINITY,
    );

    return [
      {
        value: String(recipes.length),
        label: 'Especialidades en el horno',
        detail: 'Panes, tartas y pasteles que salen cada día de nuestro obrador artesanal.',
      },
      {
        value: Number.isFinite(lowestPrice) ? `$${lowestPrice.toFixed(2)}` : '—',
        label: 'Desde este precio',
        detail: 'Elaboraciones para la mesa de cada día, sin atajos ni conservantes.',
      },
      {
        value: '100%',
        label: 'Hecho a mano',
        detail: 'Masa madre, mantequilla y fruta de temporada, horneadas antes del amanecer.',
      },
    ];
  });

  constructor() {
    this.recipeService.getRecipes();
  }

  scrollToCatalog(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('horno')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }
}
