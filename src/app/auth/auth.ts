import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AlertService } from '@core/services/alert.service';

type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-password';
type PasswordField = 'login' | 'register' | 'confirm' | 'reset';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './auth.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './auth.css',
})
export class Auth {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  mode = signal<AuthMode>('login');
  passwordVisible = signal<Record<PasswordField, boolean>>({
    login: false,
    register: false,
    confirm: false,
    reset: false,
  });

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  registerForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', Validators.required],
  });

  forgotPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  resetPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    token: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(4)]],
  });

  setMode(newMode: AuthMode) {
    this.mode.set(newMode);
  }

  togglePassword(field: PasswordField) {
    this.passwordVisible.update((current) => ({
      ...current,
      [field]: !current[field],
    }));
  }

  isPasswordVisible(field: PasswordField) {
    return this.passwordVisible()[field];
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe((response) => {
        if (response.isSuccess) {
          this.alertService.toast('Welcome back');
          this.router.navigate(['/home/profile']);
        } else {
          this.alertService.error('Access error', response.message || 'Invalid credentials');
        }
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe((response) => {
        if (response.isSuccess) {
          this.alertService.toast('Registration successful. Please sign in.');
          this.setMode('login');
        } else {
          this.alertService.error('Registration error', response.message || 'Registration failed');
        }
      });
    }
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.getRawValue()).subscribe((response) => {
        if (response.isSuccess) {
          this.alertService.toast('A recovery email has been sent.');
          this.setMode('reset-password');
        } else {
          this.alertService.error('Error', response.message || 'Request could not be processed');
        }
      });
    }
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.getRawValue()).subscribe((response) => {
        if (response.isSuccess) {
          this.alertService.toast('Password reset successfully.');
          this.setMode('login');
        } else {
          this.alertService.error('Error', response.message || 'Password could not be reset');
        }
      });
    }
  }
}
