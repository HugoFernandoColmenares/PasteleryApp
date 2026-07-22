import { Component, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ListRecipeDto } from '@core/models/recipe.model';

@Component({
    selector: 'shared-modal',
    templateUrl: './modal.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './modal.css',
})
export default class Modal {
    private router = inject(Router);
    private authService = inject(AuthService);
    public recipe = input.required<ListRecipeDto>();
    public close = output<void>();

    continueShopping() {
        this.close.emit();
    }

    goToCheckout() {
        this.close.emit();

        if (this.authService.isAuthenticated()) {
            void this.router.navigate(['/home/payment']);
            return;
        }

        void this.router.navigate(['/home/login'], {
            queryParams: { returnUrl: '/home/payment' },
        });
    }
}
