import { Cart } from './Cart';
import { OrderStatus } from '../enums/OrderStatus';

export interface Order {
  id: number;
  orderDescription: string;
  date: string;
  amount: number;
  address: string;
  payment: string;
  orderStatus: OrderStatus;
  totalAmount: number;
  discount: number;
  trackingId: string;
  userName: string;
  couponName: string;
  cartItems: Cart[];
}
