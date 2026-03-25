import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  mode = signal<'login' | 'register' | 'forgot-password' | 'reset-password'>('login');

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

  setMode(newMode: 'login' | 'register' | 'forgot-password' | 'reset-password') {
    this.mode.set(newMode);
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe(response => {
        if (response.isSuccess) {
          this.alertService.toast('¡Bienvenido de nuevo!');
          this.router.navigate(['/profile']);
        } else {
          this.alertService.error('Error de acceso', response.message || 'Credenciales incorrectas');
        }
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe(response => {
        if (response.isSuccess) {
          this.alertService.toast('Registro exitoso. Por favor, inicia sesión.');
          this.setMode('login');
        } else {
          this.alertService.error('Error de registro', response.message || 'No se pudo completar el registro');
        }
      });
    }
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.getRawValue()).subscribe(response => {
        if (response.isSuccess) {
          this.alertService.toast('Se ha enviado un correo para restablecer tu contraseña.');
          this.setMode('reset-password');
        } else {
          this.alertService.error('Error', response.message || 'No se pudo procesar la solicitud');
        }
      });
    }
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.getRawValue()).subscribe(response => {
        if (response.isSuccess) {
          this.alertService.toast('Contraseña restablecida correctamente.');
          this.setMode('login');
        } else {
          this.alertService.error('Error', response.message || 'No se pudo restablecer la contraseña');
        }
      });
    }
  }
}
