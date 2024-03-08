import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { UserStorageService } from './services/storage/user-storage.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatButton,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgxLoadingModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();

  constructor(
    private router: Router,
    public spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
    });
  }

  logout(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('/authenticate');
  }
}
