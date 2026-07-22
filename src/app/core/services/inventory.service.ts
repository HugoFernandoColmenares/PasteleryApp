import { Injectable, inject, signal } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { InventoryItemDto } from '@core/models/inventory-item.model';
import {
  InventoryItemRow,
  mapInventoryInsertPayload,
  mapInventoryItemRow,
  mapInventoryUpdatePayload,
} from '@core/models/supabase-row.model';
import { SupabaseService } from '@core/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private supabase = inject(SupabaseService).client;

  private readonly _ingredients = signal<InventoryItemDto[]>([]);
  private readonly _loading = signal<boolean>(false);

  public readonly ingredients = this._ingredients.asReadonly();
  public readonly loading = this._loading.asReadonly();

  constructor() {
    this.loadIngredients();
  }

  loadIngredients() {
    this._loading.set(true);

    from(
      this.supabase
        .from('inventory_items')
        .select('*, ingredients(*)')
        .order('last_updated', { ascending: false }),
    )
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: ({ data, error }) => {
          if (error) {
            console.error('Error fetching inventory', error);
            this._ingredients.set([]);
            return;
          }

          this._ingredients.set((data as InventoryItemRow[]).map(mapInventoryItemRow));
        },
        error: (err) => {
          console.error('Error fetching inventory', err);
          this._ingredients.set([]);
        },
      });
  }

  addIngredient(item: Partial<InventoryItemDto>): Observable<InventoryItemDto | null> {
    return from(
      this.supabase
        .from('inventory_items')
        .insert(mapInventoryInsertPayload(item))
        .select('*, ingredients(*)')
        .single(),
    ).pipe(
      map(({ data, error }) => (error || !data ? null : mapInventoryItemRow(data as InventoryItemRow))),
    );
  }

  updateIngredient(updated: InventoryItemDto): Observable<InventoryItemDto | null> {
    return from(
      this.supabase
        .from('inventory_items')
        .update(mapInventoryUpdatePayload(updated))
        .eq('id', updated.id)
        .select('*, ingredients(*)')
        .single(),
    ).pipe(
      map(({ data, error }) => (error || !data ? null : mapInventoryItemRow(data as InventoryItemRow))),
    );
  }

  deleteIngredient(id: string): Observable<boolean> {
    return from(this.supabase.from('inventory_items').delete().eq('id', id)).pipe(
      map(({ error }) => !error),
    );
  }
}
