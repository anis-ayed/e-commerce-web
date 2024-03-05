import { Injectable } from '@angular/core';
import { LoginResponse } from '../../models/LoginResponse';
import { UserRole } from '../../enums/UserRole';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: LoginResponse): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): LoginResponse {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): number {
    const user: LoginResponse = this.getUser();
    return Number(user.userId) ?? 0;
  }

  static getUserRole(): string {
    const user: LoginResponse = this.getUser();
    return user.role ?? UserRole.CUSTOMER;
  }

  static isAdminLoggedIn(): boolean {
    if (!this.getToken()) return false;
    return this.getUserRole() === UserRole.ADMIN;
  }

  static isCustomerLoggedIn(): boolean {
    if (!this.getToken()) return false;
    return this.getUserRole() === UserRole.CUSTOMER;
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
