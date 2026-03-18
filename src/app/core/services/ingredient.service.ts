import { Injectable, signal } from '@angular/core';
import { INGREDIENTS_DATA } from '@core/data/app-data';
import { IngredientDto } from '@core/interfaces/inventory-item.interface';
import { delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredientsSignal = signal<IngredientDto[]>([]);
  private loadingSignal = signal<boolean>(false);

  public ingredients = this.ingredientsSignal.asReadonly();
  public loading = this.loadingSignal.asReadonly();

  constructor() { }

  loadIngredients() {
    this.loadingSignal.set(true);
    return of([...INGREDIENTS_DATA]).pipe(
      delay(500),
      tap(data => {
        this.ingredientsSignal.set(data);
        this.loadingSignal.set(false);
      })
    );
  }

  addIngredient(ingredient: Partial<IngredientDto>) {
    const newIngredient: IngredientDto = {
      ...ingredient,
      id: `ing-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    } as IngredientDto;

    const currentIngredients = this.ingredientsSignal();
    this.ingredientsSignal.set([...currentIngredients, newIngredient]);
    return of(newIngredient).pipe(delay(300));
  }

  updateIngredient(ingredient: IngredientDto) {
    const currentIngredients = this.ingredientsSignal();
    const updatedIngredients = currentIngredients.map(i => i.id === ingredient.id ? ingredient : i);
    this.ingredientsSignal.set(updatedIngredients);
    return of(ingredient).pipe(delay(300));
  }

  deleteIngredient(id: string) {
    const currentIngredients = this.ingredientsSignal();
    this.ingredientsSignal.set(currentIngredients.filter(i => i.id !== id));
    return of(true).pipe(delay(300));
  }
}
