import { Injectable, inject, signal } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CreateRecipeDto, ListRecipeDto, RecipeDto } from '@core/models/recipe.model';
import {
  mapCreateRecipePayload,
  mapRecipeIngredientPayload,
  mapRecipeListRow,
  mapRecipeRow,
  RecipeIngredientRow,
  RecipeRow,
} from '@core/models/supabase-row.model';
import { SupabaseService } from '@core/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private supabase = inject(SupabaseService).client;

  private _recipes = signal<ListRecipeDto[]>([]);
  public recipes = this._recipes.asReadonly();

  private _loading = signal<boolean>(false);
  public loading = this._loading.asReadonly();

  getRecipes(page = 1, size = 100): void {
    this._loading.set(true);

    from(
      this.supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * size, page * size - 1),
    )
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: ({ data, error }) => {
          if (error) {
            console.error('Error fetching recipes', error);
            this._recipes.set([]);
            return;
          }

          this._recipes.set((data as RecipeRow[]).map(mapRecipeListRow));
        },
        error: (err) => {
          console.error('Error fetching recipes', err);
          this._recipes.set([]);
        },
      });
  }

  getRecipeById(id: string): Observable<RecipeDto | null> {
    return from(
      this.supabase
        .from('recipes')
        .select('*, recipe_ingredients(*, ingredients(name))')
        .eq('id', id)
        .single(),
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) {
          return null;
        }

        const row = data as RecipeRow & { recipe_ingredients: RecipeIngredientRow[] };
        return mapRecipeRow(row, row.recipe_ingredients ?? []);
      }),
    );
  }

  createRecipe(recipe: CreateRecipeDto): Observable<RecipeDto | null> {
    return from(
      this.supabase.from('recipes').insert(mapCreateRecipePayload(recipe)).select('*').single(),
    ).pipe(
      switchMap(({ data, error }) => {
        if (error || !data) {
          return from([null]);
        }

        const recipeRow = data as RecipeRow;

        if (recipe.recipeIngredients.length === 0) {
          return from([mapRecipeRow(recipeRow, [])]);
        }

        return from(
          this.supabase
            .from('recipe_ingredients')
            .insert(recipe.recipeIngredients.map((item) => mapRecipeIngredientPayload(recipeRow.id, item)))
            .select('*, ingredients(name)'),
        ).pipe(
          map(({ data: ingredients, error: ingredientError }) => {
            if (ingredientError) {
              console.error('Error creating recipe ingredients', ingredientError);
              return mapRecipeRow(recipeRow, []);
            }

            return mapRecipeRow(recipeRow, (ingredients as RecipeIngredientRow[]) ?? []);
          }),
        );
      }),
    );
  }

  updateRecipe(id: string, recipe: RecipeDto): Observable<RecipeDto | null> {
    return from(
      this.supabase
        .from('recipes')
        .update({
          name: recipe.name,
          description: recipe.description,
          instructions: recipe.instructions,
          suggested_price: recipe.suggestedPrice,
          total_cost: recipe.totalCost,
          image_url: recipe.imageUrl ?? null,
        })
        .eq('id', id)
        .select('*')
        .single(),
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) {
          return null;
        }

        return {
          ...mapRecipeRow(data as RecipeRow, []),
          recipeIngredients: recipe.recipeIngredients,
        };
      }),
    );
  }

  deleteRecipe(id: string): Observable<boolean> {
    return from(this.supabase.from('recipes').delete().eq('id', id)).pipe(
      map(({ error }) => !error),
    );
  }

  getCategories(): string[] {
    return ['Pastel', 'Cheesecake', 'Especial'];
  }
}
