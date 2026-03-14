import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { ListRecipeDto } from '@core/interfaces/recipe.interface';

@Component({
    selector: 'shared-modal',
    templateUrl: './modal.html',
    styleUrl: './modal.css',
})
export default class Modal {
    private router = inject(Router);
    public recipe = input.required<ListRecipeDto>();
    public close = output<void>();

    continueShopping() {
        this.close.emit();
    }

    goToCheckout() {
        this.close.emit();
        this.router.navigate(['/home/payment']);
    }
}
