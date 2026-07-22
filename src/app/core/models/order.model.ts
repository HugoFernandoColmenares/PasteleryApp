export type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

export interface OrderItemDto {
  id: string;
  orderId: string;
  recipeId: string;
  recipeName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderDto {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  items?: OrderItemDto[];
}

export interface CreateOrderItemDto {
  recipeId: string;
  recipeName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}
