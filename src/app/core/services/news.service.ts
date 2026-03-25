import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NewsArticle } from '../interfaces/news-article.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { map, tap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/News`;

  private newsSignal = signal<NewsArticle[]>([]);
  private loadingSignal = signal<boolean>(false);

  public news = this.newsSignal.asReadonly();
  public loading = this.loadingSignal.asReadonly();

  constructor() { }

  getNews() {
    this.loadingSignal.set(true);
    return this.http.get<ApiResponse<NewsArticle[]>>(this.apiUrl).pipe(
      finalize(() => this.loadingSignal.set(false)),
      tap(response => {
        this.newsSignal.set(response.data || []);
      }),
      map(response => response.data || [])
    );
  }

  getArticleById(id: string) {
    this.loadingSignal.set(true);
    return this.http.get<ApiResponse<NewsArticle>>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => this.loadingSignal.set(false)),
      map(response => response.data)
    );
  }
}
