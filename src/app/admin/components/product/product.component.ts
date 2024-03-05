import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {Category} from "../../../models/Category";
import {Router} from "@angular/router";
import {AdminService} from "../../service/admin.service";
import {Api} from "../../../shared/requests-api";
import {Product} from "../../../models/Product";
import {ADD_ITEM_ERROR, ADD_ITEM_SUCCESS, GET_ITEMS_ERROR} from "../../../shared/messages";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatIcon,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  listOfCategories: Category[];
  apiCategories: Api<Category[]> = new Api<Category[]>();
  apiProducts: Api<Product> = new Api<Product>();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });

    this.getAllCategories();
  }

  onFileSelected(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.previewImage();
    }
  }

  private previewImage() {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.apiProducts.execute(this.adminService.addProduct(formData), {
        successMessage: ADD_ITEM_SUCCESS.replace('#', 'product'),
        errorMessage: ADD_ITEM_ERROR.replace('#', 'product')
      }).subscribe(() => this.router.navigateByUrl('/admin/dashboard'));

    } else {
      for (const i in this.productForm.controls) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity()
      }
    }
  }

  private getAllCategories() {
    this.apiCategories.execute(this.adminService.getAllCategories(), {
      errorMessage: GET_ITEMS_ERROR.replace('#', "categories")
    }).subscribe((data: Category[]) => this.listOfCategories = data);
  }
}
