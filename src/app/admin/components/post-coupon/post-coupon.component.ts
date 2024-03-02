import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Coupon} from "../../../models/Coupon";
import {AdminService} from "../../service/admin.service";
import {Router} from "@angular/router";
import {Api} from "../../../shared/requests-api";
import {ADD_ITEM_ERROR, ADD_ITEM_SUCCESS, INPUT_IS_REQUIRED} from "../../../shared/messages";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-post-coupon',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    NgIf,
    MatError,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule
    ,MatNativeDateModule,MatInputModule
  ],
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent implements OnInit {
  protected readonly INPUT_IS_REQUIRED: string = INPUT_IS_REQUIRED;
  couponForm: FormGroup;
  api: Api<Coupon> = new Api<Coupon>()

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.couponForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
      expirationDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.couponForm.valid) {
      const newCoupon: Coupon = this.couponForm.value as Coupon;
      this.api
        .execute(this.adminService.addCoupon(newCoupon),
          {
            successMessage: ADD_ITEM_SUCCESS.replace('#', 'coupon'),
            errorMessage: ADD_ITEM_ERROR.replace('#', 'coupon')
          }).subscribe(() => this.router.navigateByUrl('/admin/dashboard'));
    } else {
      this.couponForm.markAllAsTouched();
    }
  }
}
