import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  private router = inject(Router);
  private alertService = inject(AlertService);

  async processPayment() {
    this.alertService.success('¡Pago Procesado!', '¡Gracias por su compra! Su pedido está siendo preparado.');
    this.router.navigate(['/home/main']);
  }
}
