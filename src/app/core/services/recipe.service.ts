import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';
import { ListRecipeDto, RecipeDto } from '../interfaces/recipe.interface';
import { RECIPES_DATA } from '../data/app-data';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/Recipe';

  private _recipes = signal<ListRecipeDto[]>([]);
  public recipes = this._recipes.asReadonly();

  private _loading = signal<boolean>(false);
  public loading = this._loading.asReadonly();

  getRecipes(): void {
    this._loading.set(true);

    // TEMPORAL: Mock data
    of(RECIPES_DATA).pipe(
      delay(1000),
      finalize(() => this._loading.set(false))
    ).subscribe(recipes => {
      this._recipes.set(recipes);
    });

    /* BACKEND INTEGRATION:
    this.http.get<ApiResponse<ListRecipeDto[]>>(this.apiUrl)
      .pipe(
        map(response => response.data || []),
        finalize(() => this._loading.set(false))
      ).subscribe(recipes => {
        this._recipes.set(recipes);
      });
    */
  }

  getRecipeById(id: string): Observable<RecipeDto | null> {
    // TEMPORAL: Mock data
    const recipe = RECIPES_DATA.find(r => r.id === id);
    if (!recipe) return of(null);

    const recipeDetail: RecipeDto = {
      ...recipe,
      instructions: 'Pasos detallados para preparar esta deliciosa receta...',
      recipeIngredients: []
    };
    return of(recipeDetail).pipe(delay(500));

    /* BACKEND INTEGRATION:
    return this.http.get<ApiResponse<RecipeDto>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data)
      );
    */
  }

  getCategories(): string[] {
    return ['Pastel', 'Cheesecake', 'Especial'];
  }
}
