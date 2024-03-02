import {Component, OnInit} from '@angular/core';
import {Cart} from "../../../models/Cart";
import {CustomerService} from "../../services/customer.service";
import {Api} from "../../../shared/requests-api";
import {HTTP_REQUEST_ERROR} from "../../../shared/messages";
import {Order} from "../../../models/Order";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    NgForOf,
    NgClass,
    CurrencyPipe,
    MatIconButton,
    MatButton
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private api:Api<any>  = new Api<any>();
  cartItems: Cart[] = [];
  order: Order;
  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartItems = [];
    this.api.execute(
      this.customerService.getCartByUserId(),
      {errorMessage: HTTP_REQUEST_ERROR}
    ).subscribe((order: Order) => {
      this.order = order;
      order.cartItems.forEach((cart: Cart) => {
        cart.processedImg = 'data:image/jpeg;base64,' + cart.returnedImg;
        this.cartItems.push(cart)
      });
    });

  }

}
