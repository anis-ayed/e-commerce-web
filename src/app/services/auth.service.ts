import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URI } from '../shared/config';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { UserStorageService } from './storage/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService,
  ) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URI + '/sign-up', user);
  }

  login(loginRequest: LoginRequest): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<LoginResponse>(API_URI + '/authenticate', loginRequest, {
        headers,
        observe: 'response',
      })
      .pipe(
        map(response => {
          const token: string = response.headers
            .get('Authorization')
            .substring(7);
          const loginResponse: LoginResponse = response.body;

          if (token && loginResponse) {
            this.userStorageService.saveToken(token);
            this.userStorageService.saveUser(loginResponse);
            return true;
          }
          return false;
        }),
      );
  }
}
