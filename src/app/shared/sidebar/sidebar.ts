import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { getSidebarItems } from '@core/constants/sidebar.constants';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(AuthService);

  menuItems = computed(() => getSidebarItems(this.authService.isAuthenticated()));
}
