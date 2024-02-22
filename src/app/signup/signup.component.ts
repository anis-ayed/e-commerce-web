import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {PASSWORD_NOT_MATCH, SIGN_UP_ERROR, SIGN_UP_SUCCESS} from "../shared/messages";
import {SNACKBAR_ACTION, SNACKBAR_ERROR_CONFIGURATION} from "../shared/snackbarActions";
import {Api} from "../shared/requests-api";
import {User} from "../models/User";
import {UserRole} from "../enums/UserRole";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatIconButton,
    MatSuffix,
    MatIcon,
    NgIf,
    MatButton
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  signupForm!: FormGroup;

  api: Api<User> = new Api<User>();

  constructor(private formBuilder: FormBuilder,
              private snackbar: MatSnackBar,
              private authService: AuthService,
              private router: Router) {
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    const {name, email, password, confirmPassword} = form.value;
    const user: User = new User(name, email, UserRole.CUSTOMER, password, confirmPassword);
    if (password !== confirmPassword) {
      this.snackbar.open(PASSWORD_NOT_MATCH, SNACKBAR_ACTION.CLOSE, SNACKBAR_ERROR_CONFIGURATION);
      return;
    }

    this.api.execute(
      this.authService.register(user), {successMessage: SIGN_UP_SUCCESS, errorMessage: SIGN_UP_ERROR})
      .subscribe((data) => {
        this.router.navigateByUrl('/login');
      });
  }

}
