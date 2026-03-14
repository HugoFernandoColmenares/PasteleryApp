import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);

  cartItems = this.cartService.cart;
  totalPrice = this.cartService.totalPrice;

  removeFromCart(recipeId: string) {
    this.cartService.removeFromCart(recipeId);
  }

  updateQuantity(recipeId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    this.cartService.updateQuantity(recipeId, quantity);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
