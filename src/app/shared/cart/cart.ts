import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { StorageUrlPipe } from '@shared/pipes/storage-url.pipe';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CurrencyPipe, RouterLink, StorageUrlPipe],
  templateUrl: './cart.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
