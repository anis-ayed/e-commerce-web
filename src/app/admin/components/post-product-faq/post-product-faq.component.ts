import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../../shared/requests-api';
import { FAQ } from '../../../models/FAQ';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ADD_ITEM_ERROR, ADD_ITEM_SUCCESS } from '../../../shared/messages';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-post-post-product-faq',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
  ],
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss',
})
export class PostProductFaqComponent implements OnInit {
  api: Api<FAQ> = new Api<FAQ>();
  private adminService: AdminService = inject(AdminService);
  private router: Router = inject(Router);
  private activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private forBuilder: FormBuilder = inject(FormBuilder);
  productId: number = this.activateRoute.snapshot.params['productId'];
  FAQForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.FAQForm = this.forBuilder.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    });
  }

  postFAQ(): void {
    this.api
      .execute(this.adminService.postFAQ(this.productId, this.FAQForm.value), {
        successMessage: ADD_ITEM_SUCCESS.replace('#', 'FAQ'),
        errorMessage: ADD_ITEM_ERROR.replace('#', 'FAQ'),
      })
      .subscribe(() => this.router.navigateByUrl('/admin/dashboard'));
  }
}
