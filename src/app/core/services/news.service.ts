import { Injectable, signal } from '@angular/core';
import { NEWS_DATA } from '@core/data/app-data';
import { NewsArticle } from '@core/interfaces/news-article.interface';
import { delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsSignal = signal<NewsArticle[]>([]);
  private loadingSignal = signal<boolean>(false);

  public news = this.newsSignal.asReadonly();
  public loading = this.loadingSignal.asReadonly();

  constructor() { }

  getNews() {
    this.loadingSignal.set(true);
    // Simulating API call
    return of(NEWS_DATA).pipe(
      delay(800),
      tap(data => {
        this.newsSignal.set(data);
        this.loadingSignal.set(false);
      })
    );
  }

  getArticleById(id: string) {
    this.loadingSignal.set(true);
    const article = NEWS_DATA.find(a => a.id === id);
    return of(article).pipe(
      delay(500),
      tap(() => this.loadingSignal.set(false))
    );
  }
}
