import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Api} from "../../../shared/requests-api";
import {Order} from "../../../models/Order";
import {HTTP_REQUEST_ERROR, PLACED_ORDER_SUCCESS} from "../../../shared/messages";
import {Router} from "@angular/router";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatError,
    MatLabel
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit {
  orderForm!: FormGroup;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private customService: CustomerService = inject(CustomerService);
  private router: Router = inject(Router);
  api: Api<Order> = new Api<Order>();
  matDialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.orderForm = this.formBuilder.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    });
  }

  placeOrder() {
    this.api.execute(this.customService.placeOrder(this.orderForm.value), {
      successMessage: PLACED_ORDER_SUCCESS,
      errorMessage: HTTP_REQUEST_ERROR
    }).subscribe(() => {
      this.matDialog.closeAll();
      this.router.navigateByUrl('/customer/my-orders')
    });
  }

  close(): void {
    this.matDialog.closeAll();
  }
}
