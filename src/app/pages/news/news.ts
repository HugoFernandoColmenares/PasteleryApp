import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService } from '@core/services/news.service';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterLink],
  templateUrl: './news.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './news.css',
})
export class News implements OnInit {
  private newsService = inject(NewsService);

  public news = this.newsService.news;
  public loading = this.newsService.loading;

  ngOnInit() {
    this.newsService.getNews().subscribe();
  }
}
