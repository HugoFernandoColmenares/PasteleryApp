import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IngredientDto } from '../interfaces/inventory-item.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { finalize, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Ingredient`;

  private ingredientsSignal = signal<IngredientDto[]>([]);
  private loadingSignal = signal<boolean>(false);

  public ingredients = this.ingredientsSignal.asReadonly();
  public loading = this.loadingSignal.asReadonly();

  constructor() { }

  loadIngredients() {
    this.loadingSignal.set(true);
    return this.http.get<ApiResponse<IngredientDto[]>>(this.apiUrl).pipe(
      finalize(() => this.loadingSignal.set(false)),
      tap(response => {
        this.ingredientsSignal.set(response.data || []);
      }),
      map(response => response.data || [])
    );
  }

  addIngredient(ingredient: Partial<IngredientDto>) {
    return this.http.post<ApiResponse<IngredientDto>>(this.apiUrl, ingredient).pipe(
      map(response => response.data)
    );
  }

  updateIngredient(ingredient: IngredientDto) {
    return this.http.put<ApiResponse<IngredientDto>>(`${this.apiUrl}/${ingredient.id}`, ingredient).pipe(
      map(response => response.data)
    );
  }

  deleteIngredient(id: string) {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.isSuccess)
    );
  }
}
