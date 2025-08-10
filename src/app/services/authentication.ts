import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  private user: User | undefined;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(environment.loginUrl(), {
        email: email.trim(),
        password: password.trim(),
      })
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token && res.firstName && res.lastName) {
            // store user and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', res.token);
            this.user = new User(res.firstName, res.lastName);
          }
          return this.user;
        })
      )
      .pipe(
        catchError((err) => {
          if (err?.status === 401) {
            return of(null);
          }
          return of(undefined);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.user = undefined;
  }

  public isLoggedIn() {
    return this.user != undefined;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
