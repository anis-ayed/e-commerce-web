import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Api } from '../../../shared/requests-api';
import { Wish } from '../../../models/Wish';
import { CustomerService } from '../../services/customer.service';
import {
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ITEMS_ERROR,
} from '../../../shared/messages';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [MatButton, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  apiWishList: Api<Wish[]> = new Api<Wish[]>();
  private customerService: CustomerService = inject(CustomerService);
  wishList: WritableSignal<Wish[]> = signal([]);
  api: Api<Product[]> = new Api<Product[]>();

  ngOnInit(): void {
    this.getAllWishListByUserId();
  }

  getAllWishListByUserId(): void {
    this.apiWishList
      .execute(this.customerService.getAllWishListByUserId(), {
        errorMessage: GET_ITEMS_ERROR.replace('#', 'wishlist'),
      })
      .subscribe((wishs: Wish[]) => {
        wishs.forEach(
          wish =>
            (wish.returnedImg = 'data:image/jpeg;base64,' + wish.returnedImg),
        );
        this.wishList.set(wishs);
      });
  }

  addToCart(id: number) {
    this.api
      .execute(this.customerService.addToCart(id), {
        successMessage: ADD_ITEM_SUCCESS.replace('#', 'product to cart'),
        errorMessage: ADD_ITEM_ERROR.replace('#', 'product to cart'),
      })
      .subscribe();
  }
}
