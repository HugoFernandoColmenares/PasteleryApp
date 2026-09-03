import { CommonModule } from '@angular/common';
import { Component, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListRecipeDto } from '@core/models/recipe.model';
import { CartService } from '@core/services/cart.service';
import { StorageSrcDirective } from '@shared/directives/storage-src.directive';
import Modal from '@shared/modal/modal';

@Component({
  selector: 'shared-card',
  imports: [CommonModule, RouterModule, Modal, StorageSrcDirective],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.css',
})
export class Card {
  recipe = input.required<ListRecipeDto>();
  private cartService = inject(CartService);
  showModal = signal(false);

  addToCart() {
    this.cartService.addToCart(this.recipe());
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
