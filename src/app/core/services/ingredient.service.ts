import { Injectable, inject, signal } from '@angular/core';
import { from, map, tap } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IngredientDto } from '@core/models/inventory-item.model';
import {
  IngredientRow,
  mapIngredientInsertPayload,
  mapIngredientRow,
  mapIngredientUpdatePayload,
} from '@core/models/supabase-row.model';
import { SupabaseService } from '@core/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private supabase = inject(SupabaseService).client;

  private ingredientsSignal = signal<IngredientDto[]>([]);
  private loadingSignal = signal<boolean>(false);

  public ingredients = this.ingredientsSignal.asReadonly();
  public loading = this.loadingSignal.asReadonly();

  loadIngredients() {
    this.loadingSignal.set(true);

    return from(this.supabase.from('ingredients').select('*').order('name')).pipe(
      finalize(() => this.loadingSignal.set(false)),
      tap(({ data, error }) => {
        if (error) {
          console.error('Error fetching ingredients', error);
          this.ingredientsSignal.set([]);
          return;
        }

        this.ingredientsSignal.set((data as IngredientRow[]).map(mapIngredientRow));
      }),
      map(({ data, error }) => {
        if (error) {
          return [];
        }

        return (data as IngredientRow[]).map(mapIngredientRow);
      }),
    );
  }

  addIngredient(ingredient: Partial<IngredientDto>) {
    return from(
      this.supabase.from('ingredients').insert(mapIngredientInsertPayload(ingredient)).select('*').single(),
    ).pipe(map(({ data, error }) => (error || !data ? null : mapIngredientRow(data as IngredientRow))));
  }

  updateIngredient(ingredient: IngredientDto) {
    return from(
      this.supabase
        .from('ingredients')
        .update(mapIngredientUpdatePayload(ingredient))
        .eq('id', ingredient.id)
        .select('*')
        .single(),
    ).pipe(map(({ data, error }) => (error || !data ? null : mapIngredientRow(data as IngredientRow))));
  }

  deleteIngredient(id: string) {
    return from(this.supabase.from('ingredients').delete().eq('id', id)).pipe(
      map(({ error }) => !error),
    );
  }
}
