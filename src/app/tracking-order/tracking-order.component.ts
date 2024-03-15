import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Order } from '../models/Order';
import { TrackingOrderService } from '../services/tracking-order.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Api } from '../shared/requests-api';
import { GET_ITEMS_ERROR } from '../shared/messages';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AlertErrorComponent } from '../shared/components/alert-error/alert-error.component';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tracking-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatSuffix,
    MatIcon,
    MatLabel,
    AlertErrorComponent,
    JsonPipe,
    NgTemplateOutlet,
  ],
  templateUrl: './tracking-order.component.html',
  styleUrl: './tracking-order.component.css',
})
export class TrackingOrderComponent implements OnInit {
  private trackingOrderService: TrackingOrderService =
    inject(TrackingOrderService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  api: Api<Order> = new Api<Order>();
  trackingForm: FormGroup;
  order: WritableSignal<Order> = signal(null);
  protected readonly JSON = JSON;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.trackingForm = this.formBuilder.group({
      trackingId: [null, [Validators.required]],
    });
  }

  searchOrderByTrackingId(): void {
    this.order.set(null);
    this.api
      .execute(
        this.trackingOrderService.searchOrderByTrackingId(
          this.trackingForm.get('trackingId').value,
        ),
        {
          errorMessage: GET_ITEMS_ERROR.replace('#', 'order by trackingId'),
          spinner: true,
        },
      )
      .subscribe((order: Order) => {
        if (order) this.order.set(order);
        //TODO display info
      });
  }
}
