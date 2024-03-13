import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Api } from '../../../shared/requests-api';
import { OrderedProduct } from '../../../models/OrderedProduct';
import { HTTP_REQUEST_ERROR } from '../../../shared/messages';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-view-ordered-products',
  standalone: true,
  imports: [CurrencyPipe, MatButton, RouterLink],
  templateUrl: './view-ordered-products.component.html',
  styleUrl: './view-ordered-products.component.scss',
})
export class ViewOrderedProductsComponent implements OnInit {
  orderId: number = this.activateRoute.snapshot.params['orderId'];
  api: Api<OrderedProduct> = new Api<OrderedProduct>();
  orderedProductDetails: WritableSignal<OrderedProduct> = signal(null);

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getOrderedProductsByOrderId();
  }

  getOrderedProductsByOrderId(): void {
    this.api
      .execute(this.customerService.getOrderedProductsByOrderId(this.orderId), {
        errorMessage: HTTP_REQUEST_ERROR,
      })
      .subscribe((orderedProduct: OrderedProduct) => {
        orderedProduct.productDtoList.forEach(product => {
          product.processedImg = 'data:image/jpeg;base64,' + product.byteImg;
        });
        this.orderedProductDetails.set(orderedProduct);
      });
  }
}
