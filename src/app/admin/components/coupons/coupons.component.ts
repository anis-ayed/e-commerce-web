import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {Coupon} from "../../../models/Coupon";
import {Api} from "../../../shared/requests-api";
import {GET_ITEMS_ERROR, GET_ITEMS_SUCCESS} from "../../../shared/messages";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    DatePipe,
    NgForOf
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit {
  coupons: Coupon[] = [];
  api: Api<Coupon[]> = new Api<Coupon[]>();
  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons(): void {
    this.api.execute(this.adminService.getAllCoupons(),{
      successMessage: GET_ITEMS_SUCCESS.replace('#', 'coupons'),
      errorMessage: GET_ITEMS_ERROR.replace('#', 'coupons')
    }).subscribe((coupons: Coupon[]) => this.coupons = coupons);
  }
}
