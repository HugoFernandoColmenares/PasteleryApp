import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { ListRecipeDto, RecipeDto, CreateRecipeDto } from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Recipe`;

  private _recipes = signal<ListRecipeDto[]>([]);
  public recipes = this._recipes.asReadonly();

  private _loading = signal<boolean>(false);
  public loading = this._loading.asReadonly();

  getRecipes(page: number = 1, size: number = 10): void {
    this._loading.set(true);

    this.http.get<ApiResponse<ListRecipeDto[]>>(`${this.apiUrl}?pageNumber=${page}&pageSize=${size}`)
      .pipe(
        finalize(() => this._loading.set(false))
      ).subscribe({
        next: (response) => {
          this._recipes.set(response.data || []);
        },
        error: (err) => {
          console.error('Error fetching recipes', err);
          this._recipes.set([]);
        }
      });
  }

  getRecipeById(id: string): Observable<RecipeDto | null> {
    return this.http.get<ApiResponse<RecipeDto>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  createRecipe(recipe: CreateRecipeDto): Observable<RecipeDto | null> {
    return this.http.post<ApiResponse<RecipeDto>>(this.apiUrl, recipe)
      .pipe(map(response => response.data));
  }

  updateRecipe(id: string, recipe: RecipeDto): Observable<RecipeDto | null> {
    return this.http.put<ApiResponse<RecipeDto>>(`${this.apiUrl}/${id}`, recipe)
      .pipe(map(response => response.data));
  }

  deleteRecipe(id: string): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => !!response.data));
  }

  getCategories(): string[] {
    return ['Pastel', 'Cheesecake', 'Especial'];
  }
}
