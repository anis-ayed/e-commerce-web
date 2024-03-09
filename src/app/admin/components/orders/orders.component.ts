import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Api } from '../../../shared/requests-api';
import { Order } from '../../../models/Order';
import {
  HTTP_REQUEST_ERROR,
  UPDATE_ORDER_STATUS_SUCCESS,
} from '../../../shared/messages';
import { MatCard, MatCardContent } from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NgxLoadingModule } from 'ngx-loading';
import { OrderStatus } from '../../../enums/OrderStatus';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    DatePipe,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgxLoadingModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private adminService: AdminService = inject(AdminService);
  private api: Api<Order[] | Order> = new Api<Order[] | Order>();
  orders: WritableSignal<Order[]> = signal([]);

  displayedColumns: string[] = [
    'date',
    'orderDescription',
    'address',
    'userName',
    'amount',
    'trackingId',
    'orderStatus',
    'actions',
  ];

  ngOnInit(): void {
    this.getPlacedOrders();
  }

  getPlacedOrders(): void {
    this.api
      .execute(this.adminService.getAllPlacedOrders(), {
        errorMessage: HTTP_REQUEST_ERROR,
        spinner: true,
      })
      .subscribe((orders: Order[]) => this.orders.set(orders));
  }

  changeOrderStatus(orderId: number, status: string): void {
    this.api
      .execute(this.adminService.changeOrderStatus(orderId, status), {
        successMessage: UPDATE_ORDER_STATUS_SUCCESS.replace(
          '#',
          orderId.toString(),
        ),
        errorMessage: HTTP_REQUEST_ERROR,
      })
      .subscribe(() => this.getPlacedOrders());
  }

  protected readonly OrderStatus = OrderStatus;
}
