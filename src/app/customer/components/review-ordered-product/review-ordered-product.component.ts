import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../../shared/requests-api';
import { Review } from '../../../models/Review';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { ADD_ITEM_ERROR, ADD_ITEM_SUCCESS } from '../../../shared/messages';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-review-ordered-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    NgIf,
    NgForOf,
    MatInput,
    MatButton,
    MatIcon,
    MatError,
  ],
  templateUrl: './review-ordered-product.component.html',
  styleUrl: './review-ordered-product.component.scss',
})
export class ReviewOrderedProductComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private customerService: CustomerService = inject(CustomerService);
  private activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  productId: number = this.activateRoute.snapshot.params['productId'];
  reviewForm!: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  api: Api<Review> = new Api<Review>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.reviewForm = this.formBuilder.group({
      rating: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  /**
   * Handles the event triggered when a file is selected.
   *
   * @param event The event object representing the file selection event.
   *              It should contain the target element where the file was selected.
   *              This target element is expected to be an HTMLInputElement.
   */
  onFileSelected(event: Event): void {
    const inputElement: HTMLInputElement = this.extractInputElement(event);
    if (this.isFileSelected(inputElement)) {
      this.setSelectedFile(inputElement);
      this.previewImage();
    }
  }

  private extractInputElement(event: Event): HTMLInputElement {
    return event.target as HTMLInputElement;
  }

  private isFileSelected(inputElement: HTMLInputElement): boolean {
    return inputElement.files && inputElement.files.length > 0;
  }

  private setSelectedFile(inputElement: HTMLInputElement): void {
    this.selectedFile = inputElement.files[0];
  }

  private previewImage(): void {
    const reader: FileReader = this.createFileReader();
    this.setImagePreview(reader);
  }

  private createFileReader(): FileReader {
    const reader: FileReader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result);
    return reader;
  }

  private setImagePreview(reader: FileReader): void {
    reader.readAsDataURL(this.selectedFile);
  }

  /**
   * Sets a review for a product.
   *
   * This method constructs form data with review details and submits it to the server.
   * It utilizes the createReviewFormData() method to construct the form data and
   * the submitReview() method to handle the submission process.
   *
   * Note: Ensure that the necessary properties like selectedFile, productId, userId,
   * rating, and description are set before invoking this method.
   *
   */
  setReview(): void {
    const formData: FormData = this.createReviewFormData();
    this.submitReview(formData);
  }

  private createReviewFormData(): FormData {
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());
    formData.append('rating', this.reviewForm.get('rating').value);
    formData.append('description', this.reviewForm.get('description').value);
    return formData;
  }

  private submitReview(formData: FormData): void {
    this.api
      .execute(this.customerService.setReview(formData), {
        successMessage: ADD_ITEM_SUCCESS.replace('#', 'review'),
        errorMessage: ADD_ITEM_ERROR.replace('#', 'review'),
      })
      .subscribe(() => this.router.navigateByUrl('/customer/my-orders'));
  }
}
