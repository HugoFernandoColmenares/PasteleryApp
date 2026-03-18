import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '@core/services/news.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [CommonModule, RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  public loading = this.newsService.loading;

  public article = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => {
        if (!id) return [null];
        return this.newsService.getArticleById(id);
      })
    )
  );
}
