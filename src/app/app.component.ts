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
import { NgIf } from '@angular/common';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ECommerceWeb';

  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();

  constructor(private router: Router) {}

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
