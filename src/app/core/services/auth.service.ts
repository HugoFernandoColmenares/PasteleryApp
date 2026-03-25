import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { UserLoginRequestDto, UserRegistrationRequestDto, AuthResult, UserForggotPasswordRequestDto, ResetPasswordRequestDto, ConfirmEmailDto } from '../interfaces/auth.interface';

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
  private apiUrl = `${environment.apiUrl}/Authentication`;

  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal(false);

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: UserLoginRequestDto): Observable<ApiResponse<AuthResult>> {
    return this.http.post<ApiResponse<AuthResult>>(`${this.apiUrl}/Login`, credentials)
      .pipe(
        tap(response => {
          if (response.isSuccess && response.data) {
            const user: User = {
              name: credentials.email.split('@')[0], // Fallback if name not in token
              email: credentials.email,
              token: response.data.token
            };
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
            this.isAuthenticated.set(true);
          }
        })
      );
  }

  register(userData: UserRegistrationRequestDto): Observable<ApiResponse<AuthResult>> {
    return this.http.post<ApiResponse<AuthResult>>(`${this.apiUrl}/Register`, userData);
  }

  forgotPassword(data: UserForggotPasswordRequestDto): Observable<ApiResponse<AuthResult>> {
    return this.http.post<ApiResponse<AuthResult>>(`${this.apiUrl}/ForgotPassword`, data);
  }

  resetPassword(data: ResetPasswordRequestDto): Observable<ApiResponse<AuthResult>> {
    return this.http.post<ApiResponse<AuthResult>>(`${this.apiUrl}/ResetPassword`, data);
  }

  confirmEmail(data: ConfirmEmailDto): Observable<ApiResponse<AuthResult>> {
    return this.http.post<ApiResponse<AuthResult>>(`${this.apiUrl}/ConfirmEmail`, data);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth']);
  }
}
