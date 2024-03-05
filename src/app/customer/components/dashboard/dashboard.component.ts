import { Component, OnInit } from '@angular/core';
import {
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_PRODUCTS_ERROR,
  HTTP_REQUEST_ERROR,
} from '../../../shared/messages';
import { Product } from '../../../models/Product';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, delay, of, switchMap } from 'rxjs';
import { Api } from '../../../shared/requests-api';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DescriptionPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatDivider,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    NgForOf,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  api: Api<Product[]> = new Api<Product[]>();
  searchProductsForm: FormGroup;

  constructor(
    private customerService: CustomerService,
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
      .execute(this.customerService.getAllProducts(), {
        errorMessage: GET_PRODUCTS_ERROR,
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
        .execute(this.customerService.getAllProductsByName(searchTerm), {
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

  addToCart(id: number) {
    this.api
      .execute(this.customerService.addToCart(id), {
        successMessage: ADD_ITEM_SUCCESS.replace('#', 'product to cart'),
        errorMessage: ADD_ITEM_ERROR.replace('#', 'product to cart'),
      })
      .subscribe();
  }

  protected readonly of = of;
}
