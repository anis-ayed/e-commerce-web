import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/Category';
import { Observable } from 'rxjs';
import { ADMIN_BASE_URI } from '../../shared/config';
import { createAuthorizationHeaders } from '../../shared/utils';
import { Product } from '../../models/Product';
import { Coupon } from '../../models/Coupon';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(ADMIN_BASE_URI + '/categories', category, {
      headers: createAuthorizationHeaders(),
    });
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(ADMIN_BASE_URI + '/categories', {
      headers: createAuthorizationHeaders(),
    });
  }

  addProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(ADMIN_BASE_URI + '/products', product, {
      headers: createAuthorizationHeaders(),
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ADMIN_BASE_URI + '/products', {
      headers: createAuthorizationHeaders(),
    });
  }

  getAllProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      ADMIN_BASE_URI + '/products/search/' + name,
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }

  deleteProductById(idProduct: number): Observable<any> {
    return this.http.delete(ADMIN_BASE_URI + '/products/' + idProduct, {
      headers: createAuthorizationHeaders(),
    });
  }

  addCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(ADMIN_BASE_URI + '/coupons', coupon, {
      headers: createAuthorizationHeaders(),
    });
  }

  getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(ADMIN_BASE_URI + '/coupons', {
      headers: createAuthorizationHeaders(),
    });
  }
}
