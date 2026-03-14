import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public currentUser = input<User | null>(null);
  public login = output<void>();
  public logout = output<void>();
  public toggleMenu = output<void>();
}
