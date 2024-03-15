import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { AdminService } from '../../service/admin.service';
import { Api } from '../../../shared/requests-api';
import {
  DELETE_ITEM_SUCCESS,
  GET_PRODUCTS_ERROR,
  HTTP_REQUEST_ERROR,
} from '../../../shared/messages';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { debounceTime, delay, of, switchMap } from 'rxjs';
import { ProductComponent } from '../../../shared/components/product/product.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { AlertErrorComponent } from '../../../shared/components/alert-error/alert-error.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    NgForOf,
    MatDivider,
    MatButton,
    RouterLink,
    DescriptionPipe,
    MatCardActions,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIcon,
    ProductComponent,
    MatGridList,
    MatGridTile,
    AlertErrorComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  api: Api<Product[]> = new Api<Product[]>();
  searchProductsForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.searchProductsForm = this.formBuilder.group({
      searchInput: [null, [Validators.required]],
    });
    this.getAllProduct();

    this.searchProductsForm
      .get('searchInput')
      .valueChanges.pipe(
        debounceTime(300),
        switchMap(searchTerm => {
          return of(searchTerm).pipe(delay(500));
        }),
      )
      .subscribe(() => {
        this.searchProducts();
      });
  }

  getAllProduct(): void {
    this.api
      .execute(this.adminService.getAllProducts(), {
        errorMessage: GET_PRODUCTS_ERROR,
        spinner: true,
      })
      .subscribe((data: Product[]) => {
        this.products = [];
        data.forEach((product: Product) => {
          product.processedImg = 'data:image/jpeg;base64,' + product.byteImg;
          this.products.push(product);
        });
      });
  }

  searchProducts(): void {
    const searchTerm = this.searchProductsForm.get('searchInput').value;
    if (searchTerm) {
      this.api
        .execute(this.adminService.getAllProductsByName(searchTerm), {
          errorMessage: HTTP_REQUEST_ERROR,
        })
        .subscribe((data: Product[]) => {
          this.products = data.map(product => ({
            ...product,
            processedImg: 'data:image/jpeg;base64,' + product.byteImg,
          }));
        });
    } else {
      this.getAllProduct();
    }
  }

  deleteProductById(productId: number): void {
    this.api
      .execute(this.adminService.deleteProductById(productId), {
        successMessage: DELETE_ITEM_SUCCESS.replace('#', 'product'),
        errorMessage: HTTP_REQUEST_ERROR,
      })
      .subscribe(data => {
        console.log(data);
        this.getAllProduct();
      });
  }
}
