import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Category } from '../../../models/Category';
import { Api } from '../../../shared/requests-api';
import { Product } from '../../../models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import {
  GET_ITEMS_ERROR,
  HTTP_REQUEST_ERROR,
  UPDATE_ITEM_SUCCESS,
} from '../../../shared/messages';
import { appendFormDataProduct } from '../../../shared/utils';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  listOfCategories: Category[];
  apiCategories: Api<Category[]> = new Api<Category[]>();
  api: Api<Product> = new Api<Product>();
  productId: number = this.activateRoute.snapshot.params['productId'];
  existingImg: string | ArrayBuffer | null;
  imageChanged: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private activateRoute: ActivatedRoute,
  ) {}

  updateProduct() {
    if (this.productForm.valid) {
      const formData: FormData =
        this.imageChanged && this.selectedFile
          ? appendFormDataProduct(this.productForm, true, this.selectedFile)
          : appendFormDataProduct(this.productForm, false);
      this.api
        .execute(this.adminService.updateProduct(this.productId, formData), {
          successMessage: UPDATE_ITEM_SUCCESS.replace('#', 'Product'),
          errorMessage: HTTP_REQUEST_ERROR,
        })
        .subscribe(() => this.router.navigateByUrl('/admin/dashboard'));
    }
  }

  onFileSelected(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.previewImage();
      this.imageChanged = true;
      this.existingImg = null;
    }
  }

  private previewImage() {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });

    this.getAllCategories();
    this.getProductById();
  }

  private getAllCategories() {
    this.apiCategories
      .execute(this.adminService.getAllCategories(), {
        errorMessage: GET_ITEMS_ERROR.replace('#', 'categories'),
      })
      .subscribe((data: Category[]) => (this.listOfCategories = data));
  }

  getProductById(): void {
    this.api
      .execute(this.adminService.getProductById(this.productId), {
        errorMessage: GET_ITEMS_ERROR.replace(
          '#',
          `Product by id: ${this.productId}`,
        ),
      })
      .subscribe((product: Product) => {
        this.productForm.patchValue(product);
        this.existingImg = 'data:image/jpeg;base64,' + product.byteImg;
      });
  }
}
