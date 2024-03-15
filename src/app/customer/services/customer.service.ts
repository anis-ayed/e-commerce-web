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
import { OrderedProduct } from '../../models/OrderedProduct';
import { Review } from '../../models/Review';
import { ProductDetails } from '../../models/ProductDetails';
import { Wish } from '../../models/Wish';

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
    return this.http.post<Order>(
      CUSTOMER_BASE_URI + `/place-order`,
      placeOrder,
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }

  getMyOrdersPlaced(): Observable<Order[]> {
    const userId: number = UserStorageService.getUserId();
    return this.http.get<Order[]>(CUSTOMER_BASE_URI + `/my-orders/${userId}`, {
      headers: createAuthorizationHeaders(),
    });
  }

  getOrderedProductsByOrderId(orderId: number): Observable<OrderedProduct> {
    return this.http.get<OrderedProduct>(
      CUSTOMER_BASE_URI + `/ordered-product/${orderId}`,
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }

  setReview(review: FormData): Observable<Review> {
    return this.http.post<Review>(CUSTOMER_BASE_URI + `/review`, review, {
      headers: createAuthorizationHeaders(),
    });
  }

  getProductDetailsById(productId: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(
      CUSTOMER_BASE_URI + `/products/${productId}`,
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }

  addProductToWishList(wish: Wish): Observable<Wish> {
    return this.http.post<Wish>(CUSTOMER_BASE_URI + `/wish-list`, wish, {
      headers: createAuthorizationHeaders(),
    });
  }

  getAllWishListByUserId(): Observable<Wish[]> {
    const userId: number = UserStorageService.getUserId();
    return this.http.get<Wish[]>(CUSTOMER_BASE_URI + `/wish-list/${userId}`, {
      headers: createAuthorizationHeaders(),
    });
  }
}
