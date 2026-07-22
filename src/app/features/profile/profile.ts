import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './profile.css',
})
export class Profile {
  private authService = inject(AuthService);
  user = this.authService.currentUser;
}
