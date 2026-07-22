import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem, CART_STORAGE_KEY, StoredCartItem } from '@core/models/cart.model';
import { ListRecipeDto, RecipeDto } from '@core/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItem[]>(this.readStoredCart());

  totalItems = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));
  totalPrice = computed(() =>
    this.cart().reduce((acc, item) => acc + (item.recipe.suggestedPrice || 0) * item.quantity, 0),
  );

  constructor() {
    effect(() => {
      this.writeStoredCart(this.cart());
    });
  }

  addToCart(recipe: RecipeDto | ListRecipeDto) {
    const existingItem = this.cart().find((item) => item.recipe.id === recipe.id);
    if (existingItem) {
      this.cart.update((cart) =>
        cart.map((item) =>
          item.recipe.id === recipe.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      this.cart.update((cart) => [...cart, { recipe, quantity: 1 }]);
    }
  }

  removeFromCart(recipeId: string) {
    this.cart.update((cart) => cart.filter((item) => item.recipe.id !== recipeId));
  }

  updateQuantity(recipeId: string, quantity: number) {
    this.cart.update((cart) =>
      cart
        .map((item) => (item.recipe.id === recipeId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  clearCart() {
    this.cart.set([]);
  }

  private readStoredCart(): CartItem[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);

      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as StoredCartItem[];

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter(
          (item) =>
            typeof item.recipeId === 'string' &&
            typeof item.name === 'string' &&
            typeof item.suggestedPrice === 'number' &&
            typeof item.quantity === 'number' &&
            item.quantity > 0,
        )
        .map((item) => ({
          quantity: item.quantity,
          recipe: this.toListRecipeDto(item),
        }));
    } catch {
      return [];
    }
  }

  private writeStoredCart(items: CartItem[]) {
    if (typeof window === 'undefined') {
      return;
    }

    const payload: StoredCartItem[] = items.map((item) => ({
      recipeId: item.recipe.id,
      name: item.recipe.name,
      suggestedPrice: item.recipe.suggestedPrice ?? 0,
      imageUrl: item.recipe.imageUrl,
      quantity: item.quantity,
    }));

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
  }

  private toListRecipeDto(item: StoredCartItem): ListRecipeDto {
    return {
      id: item.recipeId,
      name: item.name,
      description: '',
      totalCost: 0,
      suggestedPrice: item.suggestedPrice,
      imageUrl: item.imageUrl,
    };
  }
}
