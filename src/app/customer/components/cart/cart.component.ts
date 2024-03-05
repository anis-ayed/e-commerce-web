import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '../../../models/Cart';
import { CustomerService } from '../../services/customer.service';
import { Api } from '../../../shared/requests-api';
import {
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  HTTP_REQUEST_ERROR,
  INPUT_IS_REQUIRED,
} from '../../../shared/messages';
import { Order } from '../../../models/Order';
import { CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

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
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  protected readonly INPUT_IS_REQUIRED: string = INPUT_IS_REQUIRED;
  private api: Api<any> = new Api<any>();
  cartItems: Cart[] = [];
  order: Order;
  couponForm: FormGroup;
  private customerService: CustomerService = inject(CustomerService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
    this.getCart();
  }

  getCart(): void {
    this.cartItems = [];
    this.api
      .execute(this.customerService.getCartByUserId(), {
        errorMessage: HTTP_REQUEST_ERROR,
      })
      .subscribe((order: Order) => {
        this.order = order;
        order.cartItems.forEach((cart: Cart) => {
          cart.processedImg = 'data:image/jpeg;base64,' + cart.returnedImg;
          this.cartItems.push(cart);
        });
      });
  }

  applyCoupon(): void {
    const code: string = this.couponForm.get('code')!.value;
    this.api
      .execute(this.customerService.applyCoupon(code), {
        successMessage: ADD_ITEM_SUCCESS.replace('#', 'coupon'),
        errorMessage: ADD_ITEM_ERROR.replace('#', 'coupon'),
      })
      .subscribe(() => this.getCart());
  }

  increaseProductQuantity(productId: number): void {
    this.api
      .execute(this.customerService.increaseProductQuantity(productId), {
        errorMessage: ADD_ITEM_ERROR.replace('#', 'product'),
      })
      .subscribe(() => this.getCart());
  }

  decreaseProductQuantity(productId: number): void {
    this.api
      .execute(this.customerService.decreaseProductQuantity(productId), {
        errorMessage: DELETE_ITEM_SUCCESS.replace('#', 'product'),
      })
      .subscribe(() => this.getCart());
  }

  placeOrder(): void {
    this.dialog.open(PlaceOrderComponent);
  }
}
