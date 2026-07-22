import { Injectable, inject, signal } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { CartItem } from '@core/models/cart.model';
import { CreateOrderItemDto, OrderDto } from '@core/models/order.model';
import {
  mapCreateOrderItemPayload,
  mapCreateOrderPayload,
  mapOrderItemRow,
  mapOrderRow,
  OrderItemRow,
  OrderRow,
} from '@core/models/supabase-row.model';
import { SupabaseService } from '@core/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private supabase = inject(SupabaseService).client;

  private _orders = signal<OrderDto[]>([]);
  public orders = this._orders.asReadonly();

  private _loading = signal(false);
  public loading = this._loading.asReadonly();

  createOrder(cartItems: CartItem[]): Observable<OrderDto | null> {
    return from(this.supabase.auth.getUser()).pipe(
      switchMap(({ data, error }) => {
        const userId = data.user?.id;

        if (error || !userId) {
          throw new Error('Debes iniciar sesión para completar la compra.');
        }

        if (cartItems.length === 0) {
          throw new Error('El carrito está vacío.');
        }

        const orderItems = this.mapCartItems(cartItems);
        const totalAmount = orderItems.reduce((acc, item) => acc + item.lineTotal, 0);

        return from(
          this.supabase
            .from('orders')
            .insert(mapCreateOrderPayload(userId, totalAmount))
            .select('*')
            .single(),
        ).pipe(
          switchMap(({ data: orderData, error: orderError }) => {
            if (orderError || !orderData) {
              throw new Error(orderError?.message ?? 'No se pudo crear el pedido.');
            }

            const order = orderData as OrderRow;
            const itemPayloads = orderItems.map((item) => mapCreateOrderItemPayload(order.id, item));

            return from(
              this.supabase.from('order_items').insert(itemPayloads).select('*'),
            ).pipe(
              map(({ data: itemsData, error: itemsError }) => {
                if (itemsError) {
                  throw new Error(itemsError.message);
                }

                return mapOrderRow(order, (itemsData as OrderItemRow[]) ?? []);
              }),
            );
          }),
        );
      }),
    );
  }

  loadMyOrders(): void {
    this._loading.set(true);

    from(
      this.supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false }),
    ).subscribe({
      next: ({ data, error }) => {
        this._loading.set(false);

        if (error) {
          console.error('Error fetching orders', error);
          this._orders.set([]);
          return;
        }

        const orders = (data ?? []).map((row) => {
          const orderRow = row as OrderRow & { order_items?: OrderItemRow[] };
          return mapOrderRow(orderRow, orderRow.order_items ?? []);
        });

        this._orders.set(orders);
      },
      error: (err) => {
        this._loading.set(false);
        console.error('Error fetching orders', err);
        this._orders.set([]);
      },
    });
  }

  private mapCartItems(cartItems: CartItem[]): CreateOrderItemDto[] {
    return cartItems.map((item) => {
      const unitPrice = item.recipe.suggestedPrice ?? 0;
      const quantity = item.quantity;

      return {
        recipeId: item.recipe.id,
        recipeName: item.recipe.name,
        unitPrice,
        quantity,
        lineTotal: unitPrice * quantity,
      };
    });
  }
}
