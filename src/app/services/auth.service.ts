import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {API_URI} from "../shared/config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URI + '/sign-up', user);
  }
}
