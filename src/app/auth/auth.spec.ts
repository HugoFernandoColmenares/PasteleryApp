import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { AlertService } from '../core/services/alert.service';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('Auth Component', () => {
  let component: Auth;
  let fixture: ComponentFixture<Auth>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'forgotPassword', 'resetPassword']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['toast', 'error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Auth, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Auth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch mode correctly', () => {
    component.setMode('register');
    expect(component.mode()).toBe('register');
  });

  it('should have invalid login form when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should call login on AuthService when form is valid', () => {
    authServiceSpy.login.and.returnValue(of({ isSuccess: true, data: {} as any, message: '', errors: [], statusCode: 200 } as any));

    component.loginForm.controls.email.setValue('test@test.com');
    component.loginForm.controls.password.setValue('password');

    expect(component.loginForm.valid).toBeTrue();
    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });
});
