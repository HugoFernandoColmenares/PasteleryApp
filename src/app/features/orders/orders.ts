import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './orders.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);

  orders = this.orderService.orders;
  loading = this.orderService.loading;

  ngOnInit() {
    this.orderService.loadMyOrders();
  }
}
