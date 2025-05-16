import { Product } from './Product';

export type OrderStatus = 'PENDING' | 'APPROVED' | 'CANCELLED';

export interface Order {
  id: number;
  total_pedido: number;
  status: OrderStatus;
  produtos: Product[];
}

export interface CreateOrderDto {
  produto_ids: number[];
  status?: OrderStatus;
} 