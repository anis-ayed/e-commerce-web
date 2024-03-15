import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Api } from '../../../shared/requests-api';
import { ProductDetails } from '../../../models/ProductDetails';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ITEMS_ERROR,
} from '../../../shared/messages';
import { Product } from '../../../models/Product';
import { FAQ } from '../../../models/FAQ';
import { Review } from '../../../models/Review';
import { Wish } from '../../../models/Wish';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view-product-details',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './view-product-details.component.html',
  styleUrl: './view-product-details.component.scss',
})
export class ViewProductDetailsComponent implements OnInit {
  apiProductDetails: Api<ProductDetails> = new Api<ProductDetails>();
  apiWishList: Api<Wish> = new Api<Wish>();
  private customerService: CustomerService = inject(CustomerService);
  private activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  productId: number = this.activateRoute.snapshot.params['productId'];
  product: WritableSignal<Product> = signal(null);
  FAQS: WritableSignal<FAQ[]> = signal([]);
  reviews: WritableSignal<Review[]> = signal([]);

  ngOnInit(): void {
    this.getProductDetailsById();
  }

  getProductDetailsById(): void {
    this.apiProductDetails
      .execute(this.customerService.getProductDetailsById(this.productId), {
        errorMessage: GET_ITEMS_ERROR.replace('#', 'product details'),
      })
      .subscribe((productDetails: ProductDetails) => {
        productDetails.productDto.processedImg =
          'data:image/jpeg;base64,' + productDetails.productDto.byteImg;
        this.product.set(productDetails.productDto);
        this.FAQS.set(productDetails.faqDtoList);
        productDetails.reviewDtoList.forEach(
          (review: Review) =>
            (review.img = 'data:image/jpeg;base64,' + review.returnedImg),
        );
        this.reviews.set(productDetails.reviewDtoList);
      });
  }

  addProductToWishList(): void {
    const wish: Wish = {
      productId: this.productId,
      userId: UserStorageService.getUserId(),
    };
    this.apiWishList
      .execute(this.customerService.addProductToWishList(wish), {
        successMessage: ADD_ITEM_SUCCESS.replace('#', 'product to wishList'),
        errorMessage: ADD_ITEM_ERROR.replace('#', 'product to wishList'),
      })
      .subscribe();
  }
}
