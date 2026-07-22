import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

describe('AuthService', () => {
  let service: AuthService;
  let signOutSpy: jasmine.Spy;

  beforeEach(() => {
    signOutSpy = jasmine.createSpy('signOut').and.returnValue(Promise.resolve({ error: null }));

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: SupabaseService,
          useValue: {
            client: {
              auth: {
                getSession: jasmine.createSpy('getSession').and.returnValue(
                  Promise.resolve({ data: { session: null }, error: null }),
                ),
                onAuthStateChange: jasmine.createSpy('onAuthStateChange').and.returnValue({
                  data: { subscription: { unsubscribe: () => undefined } },
                }),
                signOut: signOutSpy,
              },
            },
          },
        },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear signals on logout', () => {
    service.logout();
    expect(signOutSpy).toHaveBeenCalled();
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.currentUser()).toBeNull();
  });
});
