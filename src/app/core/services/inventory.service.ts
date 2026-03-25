import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { InventoryItemDto } from '../interfaces/inventory-item.interface';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/InventoryItem`;

  private readonly _ingredients = signal<InventoryItemDto[]>([]);
  private readonly _loading = signal<boolean>(false);

  public readonly ingredients = this._ingredients.asReadonly();
  public readonly loading = this._loading.asReadonly();

  constructor() {
    this.loadIngredients();
  }

  loadIngredients() {
    this._loading.set(true);

    this.http.get<ApiResponse<InventoryItemDto[]>>(this.apiUrl)
      .pipe(
        finalize(() => this._loading.set(false))
      ).subscribe({
        next: (response) => {
          this._ingredients.set(response.data || []);
        },
        error: (err) => {
          console.error('Error fetching inventory', err);
          this._ingredients.set([]);
        }
      });
  }

  addIngredient(item: Partial<InventoryItemDto>): Observable<InventoryItemDto | null> {
    return this.http.post<ApiResponse<InventoryItemDto>>(this.apiUrl, item)
      .pipe(map(response => response.data));
  }

  updateIngredient(updated: InventoryItemDto): Observable<InventoryItemDto | null> {
    return this.http.put<ApiResponse<InventoryItemDto>>(`${this.apiUrl}/${updated.id}`, updated)
      .pipe(map(response => response.data));
  }

  deleteIngredient(id: string): Observable<boolean> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.isSuccess));
  }
}
