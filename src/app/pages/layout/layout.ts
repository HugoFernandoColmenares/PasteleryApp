import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Footer } from '@shared/footer/footer';
import { Header } from '@shared/header/header';
import { Sidebar } from '@shared/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, Header, Sidebar, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    public currentUser = this.authService.currentUser;
    public isSidebarOpen = signal(false);

    toggleSidebar() {
        this.isSidebarOpen.update(v => !v);
    }

    closeSidebar() {
        this.isSidebarOpen.set(false);
    }

    login() {
        this.router.navigate(['/home/login']);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/home/main']);
    }
}
