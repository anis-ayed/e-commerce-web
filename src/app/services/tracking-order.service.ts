import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { API_URI } from '../shared/config';

@Injectable({
  providedIn: 'root',
})
export class TrackingOrderService {
  private http: HttpClient = inject(HttpClient);

  searchOrderByTrackingId(trackingId: string): Observable<Order> {
    return this.http.get<Order>(API_URI + `/order/track/${trackingId}`);
  }
}
