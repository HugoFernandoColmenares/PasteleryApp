import { Injectable, inject, signal } from '@angular/core';
import { from, map, tap } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NewsArticle } from '@core/models/news-article.model';
import { mapNewsArticleRow, NewsArticleRow } from '@core/models/supabase-row.model';
import { SupabaseService } from '@core/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private supabase = inject(SupabaseService).client;

  private newsSignal = signal<NewsArticle[]>([]);
  private loadingSignal = signal<boolean>(false);

  public news = this.newsSignal.asReadonly();
  public loading = this.loadingSignal.asReadonly();

  getNews() {
    this.loadingSignal.set(true);

    return from(
      this.supabase.from('news_articles').select('*').order('created_at', { ascending: false }),
    ).pipe(
      finalize(() => this.loadingSignal.set(false)),
      tap(({ data, error }) => {
        if (error) {
          console.error('Error fetching news', error);
          this.newsSignal.set([]);
          return;
        }

        this.newsSignal.set((data as NewsArticleRow[]).map(mapNewsArticleRow));
      }),
      map(({ data, error }) => {
        if (error) {
          return [];
        }

        return (data as NewsArticleRow[]).map(mapNewsArticleRow);
      }),
    );
  }

  getArticleById(id: string) {
    this.loadingSignal.set(true);

    return from(this.supabase.from('news_articles').select('*').eq('id', id).single()).pipe(
      finalize(() => this.loadingSignal.set(false)),
      map(({ data, error }) => (error || !data ? null : mapNewsArticleRow(data as NewsArticleRow))),
    );
  }
}
