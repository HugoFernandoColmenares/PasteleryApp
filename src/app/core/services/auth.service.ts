import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, of, delay } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

export interface User {
  name: string;
  email: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7229/api/Authentication';

  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal(false);

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: any): Observable<ApiResponse<User>> {
    // TEMPORAL: Mock data
    // const mockResponse: ApiResponse<User> = {
    //   data: {
    //     name: credentials.email.split('@')[0],
    //     email: credentials.email,
    //     token: 'mock-jwt-token'
    //   },
    //   message: 'Success',
    //   errors: null,
    //   isSuccess: true,
    //   statusCode: 200
    // };

    // return of(mockResponse).pipe(
    //   delay(800),
    //   tap(response => {
    //     if (response.isSuccess && response.data) {
    //       localStorage.setItem('user', JSON.stringify(response.data));
    //       this.currentUser.set(response.data);
    //       this.isAuthenticated.set(true);
    //     }
    //   })
    // );

    // BACKEND INTEGRATION:
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/Login`, credentials)
      .pipe(
        tap(response => {
          console.log(response);
          
          if (response.isSuccess && response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            this.currentUser.set(response.data);
            this.isAuthenticated.set(true);
          }
        })
      );
  }

  register(userData: any): Observable<ApiResponse<any>> {
    // TEMPORAL: Mock data
    const mockResponse: ApiResponse<any> = {
      data: null,
      message: 'User registered successfully',
      errors: null,
      isSuccess: true,
      statusCode: 200
    };
    return of(mockResponse).pipe(delay(800));

    /* BACKEND INTEGRATION:
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/Register`, userData);
    */
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/home/login']);
  }
}
