import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BASE_URL, STORAGE_KEY } from '../global-data';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginParams } from '../interface/login.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private localService: LocalStorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  loginUser(params: LoginParams): Observable<string> {
    return this.http.post<string>(BASE_URL + '/auth/login', params).pipe(
      catchError((errorRes) => {
        return throwError(() => new Error(errorRes));
      })
    );
  }

  logoutUser() {
    this.localService.removeData(STORAGE_KEY);
    this.navigateToLogin();
  }

  getToken() {
    const response = this.localService.getData(STORAGE_KEY);
    console.log('response getToken', response);

    return response;
  }

  setToken(token: string) {
    return this.localService.saveData(STORAGE_KEY, JSON.stringify(token));
  }

  get isLoggedIn() {
    const response = this.getToken();
    console.log('token', response);

    if (response != null) {
      return true;
    }

    return false;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
