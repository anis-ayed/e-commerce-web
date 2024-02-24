import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/Product";
import {AdminService} from "../../service/admin.service";
import {Api} from "../../../shared/requests-api";
import {GET_PRODUCTS_ERROR} from "../../../shared/messages";
import {MatCard} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    NgForOf,
    MatDivider
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  api: Api<Product[]> = new Api<Product[]>();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(): void {
    this.api.execute(this.adminService.getAllProducts(), {
      errorMessage: GET_PRODUCTS_ERROR
    }).subscribe((data: Product[]) => {
      data.forEach((product: Product) => {
        product.processedImg = 'data:image/jpeg;base64,' + product.byteImg;
        this.products.push(product);
      });
    });
  }
}
