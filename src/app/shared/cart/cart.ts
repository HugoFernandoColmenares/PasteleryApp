import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@core/services/cart.service';
import { StorageUrlPipe } from '@shared/pipes/storage-url.pipe';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CurrencyPipe, StorageUrlPipe],
  templateUrl: './cart.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  cartItems = this.cartService.cart;
  totalPrice = this.cartService.totalPrice;

  proceedToPayment() {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/home/payment']);
      return;
    }

    void this.router.navigate(['/home/login'], {
      queryParams: { returnUrl: '/home/payment' },
    });
  }

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
