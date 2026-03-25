import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { StorageLocationDto, CreateStorageLocationDto } from '../interfaces/storage-location.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageLocationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/StorageLocation`;

  private readonly _locations = signal<StorageLocationDto[]>([]);
  private readonly _loading = signal<boolean>(false);

  public readonly locations = this._locations.asReadonly();
  public readonly loading = this._loading.asReadonly();

  loadLocations() {
    this._loading.set(true);
    return this.http.get<ApiResponse<StorageLocationDto[]>>(this.apiUrl)
      .pipe(
        finalize(() => this._loading.set(false))
      ).subscribe({
        next: (response) => {
          this._locations.set(response.data || []);
        },
        error: (err) => {
          console.error('Error fetching storage locations', err);
          this._locations.set([]);
        }
      });
  }

  getLocationById(id: string): Observable<StorageLocationDto | null> {
    return this.http.get<ApiResponse<StorageLocationDto>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  createLocation(location: CreateStorageLocationDto): Observable<StorageLocationDto | null> {
    return this.http.post<ApiResponse<StorageLocationDto>>(this.apiUrl, location)
      .pipe(map(response => response.data));
  }

  updateLocation(id: string, location: StorageLocationDto): Observable<StorageLocationDto | null> {
    return this.http.put<ApiResponse<StorageLocationDto>>(`${this.apiUrl}/${id}`, location)
      .pipe(map(response => response.data));
  }

  deleteLocation(id: string): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => !!response.isSuccess));
  }
}
