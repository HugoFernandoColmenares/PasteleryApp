import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user and update signals and localStorage on login', () => {
    const mockCredentials = { email: 'test@test.com', password: 'password123' };
    const mockResponse = {
      isSuccess: true,
      data: { token: 'mock-token', roles: [], expiration: new Date() },
      message: 'Success'
    };

    service.login(mockCredentials).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/Authentication/Login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.setItem).toHaveBeenCalledWith('user', jasmine.any(String));
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.currentUser()?.email).toBe('test@test.com');
  });

  it('should clear signals and localStorage on logout', () => {
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.currentUser()).toBeNull();
  });
  
  it('should propagate API errors', () => {
    const mockCredentials = { email: 'test@test.com', password: 'wrong' };

    service.login(mockCredentials).subscribe({
      error: (error) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/Authentication/Login`);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });
});
