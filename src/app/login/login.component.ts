import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Api } from '../shared/requests-api';
import { LoginResponse } from '../models/LoginResponse';
import { LOGIN_ERROR, LOGIN_SUCCESS } from '../shared/messages';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatError,
    NgIf,
    MatIcon,
    MatIconButton,
    MatLabel,
    MatSuffix,
    MatCardActions,
    MatButton,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;
  loginForm: FormGroup;
  api: Api<LoginResponse> = new Api<LoginResponse>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const username: string = this.loginForm.get('email')!.value;
    const password: string = this.loginForm.get('password')!.value;
    this.api
      .execute(this.authService.login({ username, password }), {
        successMessage: LOGIN_SUCCESS,
        errorMessage: LOGIN_ERROR,
      })
      .subscribe(() => {
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else if (UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('/customer/dashboard');
        } else {
          this.router.navigateByUrl('/authenticate');
        }
      });
  }
}
