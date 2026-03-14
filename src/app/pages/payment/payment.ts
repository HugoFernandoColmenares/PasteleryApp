import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  private router = inject(Router);

  processPayment() {
    alert('¡Gracias por su compra! Su pedido está siendo procesado.');
    this.router.navigate(['/home/main']);
  }
}
