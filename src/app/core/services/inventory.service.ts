import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';
import { InventoryItemDto, IngredientDto } from '../interfaces/inventory-item.interface';
import { INVENTORY_DATA } from '../data/app-data';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/InventoryItem';
  private ingredientApiUrl = 'http://localhost:5000/api/Ingredient';

  private readonly _ingredients = signal<InventoryItemDto[]>([]);
  private readonly _loading = signal<boolean>(false);

  public readonly ingredients = this._ingredients.asReadonly();
  public readonly loading = this._loading.asReadonly();

  constructor() {
    this.loadIngredients();
  }

  loadIngredients() {
    this._loading.set(true);

    // TEMPORAL: Mock data
    of(INVENTORY_DATA).pipe(
      delay(800),
      finalize(() => this._loading.set(false))
    ).subscribe(items => {
      this._ingredients.set(items);
    });

    /* BACKEND INTEGRATION:
    this.http.get<ApiResponse<InventoryItemDto[]>>(this.apiUrl)
      .pipe(
        map(response => response.data || []),
        finalize(() => this._loading.set(false))
      ).subscribe(items => {
        this._ingredients.set(items);
      });
    */
  }

  addIngredient(item: Partial<InventoryItemDto>): Observable<InventoryItemDto | null> {
    // TEMPORAL: Mock data
    const newItem: InventoryItemDto = {
      ...item,
      id: `mock-${Date.now()}`,
      lastUpdated: new Date().toISOString()
    } as InventoryItemDto;
    return of(newItem).pipe(delay(500));

    /* BACKEND INTEGRATION:
    return this.http.post<ApiResponse<InventoryItemDto>>(this.apiUrl, item)
      .pipe(map(response => response.data));
    */
  }

  updateIngredient(updated: InventoryItemDto): Observable<InventoryItemDto | null> {
    // TEMPORAL: Mock data
    return of(updated).pipe(delay(500));

    /* BACKEND INTEGRATION:
    return this.http.put<ApiResponse<InventoryItemDto>>(`${this.apiUrl}/${updated.id}`, updated)
      .pipe(map(response => response.data));
    */
  }

  deleteIngredient(id: string): Observable<boolean> {
    // TEMPORAL: Mock data
    return of(true).pipe(delay(500));

    /* BACKEND INTEGRATION:
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.isSuccess));
    */
  }
}
