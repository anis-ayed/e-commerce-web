import { Component, OnInit } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { Api } from '../../../shared/requests-api';
import { Category } from '../../../models/Category';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { ADD_ITEM_ERROR, ADD_ITEM_SUCCESS } from '../../../shared/messages';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatError,
    NgIf,
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardContent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  api: Api<Category> = new Api<Category>();
  categoryForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService,
  ) {}
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      this.api
        .execute(this.adminService.addCategory(this.categoryForm.value), {
          successMessage: ADD_ITEM_SUCCESS.replace('#', 'category'),
          errorMessage: ADD_ITEM_ERROR.replace('#', 'category'),
        })
        .subscribe(() => this.router.navigateByUrl('/admin/dashboard'));
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
