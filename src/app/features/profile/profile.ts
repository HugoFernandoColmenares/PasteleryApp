import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './profile.css',
})
export class Profile {
  private authService = inject(AuthService);
  user = this.authService.currentUser;
}
