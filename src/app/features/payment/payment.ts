import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';
import { StorageUrlPipe } from '@shared/pipes/storage-url.pipe';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, CurrencyPipe, RouterLink, StorageUrlPipe],
  templateUrl: './payment.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './payment.css',
})
export class Payment {
  private router = inject(Router);
  private alertService = inject(AlertService);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);

  cartItems = this.cartService.cart;
  totalPrice = this.cartService.totalPrice;
  processing = signal(false);

  processPayment() {
    if (this.cartItems().length === 0) {
      this.alertService.error('Carrito vacío', 'Agrega productos antes de pagar.');
      this.router.navigate(['/home/main']);
      return;
    }

    this.processing.set(true);

    this.orderService.createOrder(this.cartItems()).subscribe({
      next: (order) => {
        this.processing.set(false);

        if (!order) {
          this.alertService.error('Error', 'No se pudo registrar el pedido.');
          return;
        }

        this.cartService.clearCart();
        this.alertService.success(
          'Pago procesado',
          'Gracias por tu compra. Tu pedido está siendo preparado.',
        );
        this.router.navigate(['/home/orders']);
      },
      error: (error: Error) => {
        this.processing.set(false);
        this.alertService.error('Error de pago', error.message);
      },
    });
  }
}
