import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { from, map, Observable, switchMap } from 'rxjs';
import { ApiResponse } from '@core/models/api-response.model';
import {
  AuthResult,
  ConfirmEmailDto,
  ResetPasswordRequestDto,
  User,
  UserForgotPasswordRequestDto,
  UserLoginRequestDto,
  UserRegistrationRequestDto,
} from '@core/models/auth.model';
import { SupabaseService } from '@core/services/supabase.service';
import { createErrorResponse, createSuccessResponse } from '@core/services/supabase-response.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private supabase = inject(SupabaseService).client;

  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal(false);

  constructor() {
    void this.initializeSession();

    this.supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        this.setUserFromSession(session.user, session.access_token);
      } else {
        this.clearSessionState();
      }
    });
  }

  private async initializeSession() {
    const { data } = await this.supabase.auth.getSession();

    if (data.session?.user) {
      this.setUserFromSession(data.session.user, data.session.access_token);
    }
  }

  private setUserFromSession(
    authUser: { id: string; email?: string; user_metadata?: Record<string, string> },
    token?: string,
  ) {
    const email = authUser.email ?? '';
    const firstName = authUser.user_metadata?.['first_name'] ?? '';
    const lastName = authUser.user_metadata?.['last_name'] ?? '';
    const displayName = [firstName, lastName].filter(Boolean).join(' ').trim() || email.split('@')[0];

    const user: User = {
      id: authUser.id,
      name: displayName,
      email,
      token,
    };

    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private clearSessionState() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  login(credentials: UserLoginRequestDto): Observable<ApiResponse<AuthResult>> {
    return from(
      this.supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      }),
    ).pipe(
      map(({ data, error }) => {
        if (error || !data.session) {
          return createErrorResponse<AuthResult>(error?.message ?? 'Invalid credentials', 401);
        }

        this.setUserFromSession(data.session.user, data.session.access_token);

        return createSuccessResponse<AuthResult>(
          {
            token: data.session.access_token,
            result: true,
            errors: [],
          },
          'Login successful',
        );
      }),
    );
  }

  register(userData: UserRegistrationRequestDto): Observable<ApiResponse<AuthResult>> {
    return from(
      this.supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          },
        },
      }),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          return createErrorResponse<AuthResult>(error.message, 400);
        }

        return createSuccessResponse<AuthResult>(
          {
            token: data.session?.access_token ?? '',
            result: true,
            errors: [],
          },
          'Registration successful',
        );
      }),
    );
  }

  forgotPassword(data: UserForgotPasswordRequestDto): Observable<ApiResponse<AuthResult>> {
    return from(
      this.supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/#/home/login`,
      }),
    ).pipe(
      map(({ error }) => {
        if (error) {
          return createErrorResponse<AuthResult>(error.message, 400);
        }

        return createSuccessResponse<AuthResult>(
          { token: '', result: true, errors: [] },
          'Recovery email sent',
        );
      }),
    );
  }

  resetPassword(data: ResetPasswordRequestDto): Observable<ApiResponse<AuthResult>> {
    return from(
      this.supabase.auth.verifyOtp({
        email: data.email,
        token: data.token,
        type: 'recovery',
      }),
    ).pipe(
      switchMap(({ error: verifyError }) => {
        if (verifyError) {
          return from([createErrorResponse<AuthResult>(verifyError.message, 400)]);
        }

        return from(
          this.supabase.auth.updateUser({
            password: data.newPassword,
          }),
        ).pipe(
          map(({ error }) => {
            if (error) {
              return createErrorResponse<AuthResult>(error.message, 400);
            }

            return createSuccessResponse<AuthResult>(
              { token: '', result: true, errors: [] },
              'Password reset successful',
            );
          }),
        );
      }),
    );
  }

  confirmEmail(data: ConfirmEmailDto): Observable<ApiResponse<AuthResult>> {
    return from(
      this.supabase.auth.verifyOtp({
        token_hash: data.token,
        type: 'email',
      }),
    ).pipe(
      map(({ error }) => {
        if (error) {
          return createErrorResponse<AuthResult>(error.message, 400);
        }

        return createSuccessResponse<AuthResult>({ token: '', result: true, errors: [] });
      }),
    );
  }

  logout() {
    void this.supabase.auth.signOut();
    this.clearSessionState();
    this.router.navigate(['/home/login']);
  }
}
