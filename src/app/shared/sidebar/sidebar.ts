import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SIDEBAR_ITEMS } from '@core/data/app-data';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public menuItems = SIDEBAR_ITEMS;
}
