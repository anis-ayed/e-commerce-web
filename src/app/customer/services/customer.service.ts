import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Product } from '../../models/Product';
import { CUSTOMER_BASE_URI } from '../../shared/config';
import { createAuthorizationHeaders } from '../../shared/utils';
import { Cart } from '../../models/Cart';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { Order } from '../../models/Order';
import { PlaceOrder } from '../../models/PlaceOrder';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(CUSTOMER_BASE_URI + '/products', {
        headers: createAuthorizationHeaders(),
      })
      .pipe(take(1));
  }

  getAllProductsByName(name: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(CUSTOMER_BASE_URI + '/products/search/' + name, {
        headers: createAuthorizationHeaders(),
      })
      .pipe(take(1));
  }

  addToCart(productId: number): Observable<Product[]> {
    const cart: Cart = { productId, userId: UserStorageService.getUserId() };
    return this.http.post<Product[]>(CUSTOMER_BASE_URI + '/cart', cart, {
      headers: createAuthorizationHeaders(),
    });
  }

  getCartByUserId(): Observable<Order> {
    const userId: number = UserStorageService.getUserId();
    return this.http
      .get<Order>(CUSTOMER_BASE_URI + '/cart/' + userId, {
        headers: createAuthorizationHeaders(),
      })
      .pipe(take(1));
  }

  applyCoupon(code: string): Observable<Order> {
    const userId: number = UserStorageService.getUserId();
    return this.http
      .get<Order>(CUSTOMER_BASE_URI + `/coupon/${userId}/${code}`, {
        headers: createAuthorizationHeaders(),
      })
      .pipe(take(1));
  }

  increaseProductQuantity(productId: number): Observable<Product[]> {
    const cart: Cart = { productId, userId: UserStorageService.getUserId() };
    return this.http.post<Product[]>(CUSTOMER_BASE_URI + '/increase', cart, {
      headers: createAuthorizationHeaders(),
    });
  }

  decreaseProductQuantity(productId: number): Observable<Product[]> {
    const cart: Cart = { productId, userId: UserStorageService.getUserId() };
    return this.http.post<Product[]>(CUSTOMER_BASE_URI + '/decrease', cart, {
      headers: createAuthorizationHeaders(),
    });
  }

  placeOrder(placeOrder: PlaceOrder): Observable<Order> {
    placeOrder.userId = UserStorageService.getUserId();
    placeOrder.orderDescription = 'Some order description';
    placeOrder.address = 'Some delivery address';
    return this.http.post<Order>(
      CUSTOMER_BASE_URI + `/place-order`,
      placeOrder,
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }
}
