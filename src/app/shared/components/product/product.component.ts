import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { Product } from '../../../models/Product';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatDivider,
    MatCardActions,
    RouterLink,
    MatButton,
    DescriptionPipe,
    MatCardFooter,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  product: InputSignal<Product> = input.required();
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  @Output() onUpdate: EventEmitter<void> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<void> = new EventEmitter();

  delete(): void {
    this.onDelete.next();
  }

  update(): void {
    this.onUpdate.next();
  }

  addToCart(): void {
    this.onAddToCart.next();
  }
}
