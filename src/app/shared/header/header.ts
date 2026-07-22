import { Component, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '@core/models/auth.model';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.css',
})
export class Header {
  private cartService = inject(CartService);

  public currentUser = input<User | null>(null);
  public login = output<void>();
  public logout = output<void>();
  public toggleMenu = output<void>();

  cartItemCount = this.cartService.totalItems;
}
