import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Api } from '../../../shared/requests-api';
import { Order } from '../../../models/Order';
import { CustomerService } from '../../services/customer.service';
import { HTTP_REQUEST_ERROR } from '../../../shared/messages';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatLine } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { MatGridList } from '@angular/material/grid-list';
import { OrderStatus } from '../../../enums/OrderStatus';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatList,
    MatCardContent,
    MatListItem,
    MatIcon,
    NgIf,
    NgForOf,
    MatIconButton,
    MatLine,
    MatDivider,
    MatGridList,
    RouterLink,
    MatButton,
    MatCardFooter,
  ],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss',
})
export class CustomerOrdersComponent implements OnInit {
  private api: Api<Order[]> = new Api<Order[]>();
  private customerService: CustomerService = inject(CustomerService);
  orders: WritableSignal<Order[]> = signal([]);

  ngOnInit(): void {
    this.api
      .execute(this.customerService.getMyOrdersPlaced(), {
        errorMessage: HTTP_REQUEST_ERROR,
        spinner: true,
      })
      .subscribe((orders: Order[]) => this.orders.set(orders));
  }

  protected readonly OrderStatus = OrderStatus;
}
