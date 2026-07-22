import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '@core/models/cart.model';
import { ListRecipeDto, RecipeDto } from '@core/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItem[]>([]);

  totalItems = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));
  totalPrice = computed(() =>
    this.cart().reduce((acc, item) => acc + (item.recipe.suggestedPrice || 0) * item.quantity, 0),
  );

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
}
