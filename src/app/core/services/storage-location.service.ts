import { Injectable, inject, signal } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CreateStorageLocationDto, StorageLocationDto } from '@core/models/storage-location.model';
import {
  mapCreateStorageLocationPayload,
  mapStorageLocationRow,
  mapStorageLocationUpdatePayload,
  StorageLocationRow,
} from '@core/models/supabase-row.model';
import { SupabaseService } from '@core/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class StorageLocationService {
  private supabase = inject(SupabaseService).client;

  private readonly _locations = signal<StorageLocationDto[]>([]);
  private readonly _loading = signal<boolean>(false);

  public readonly locations = this._locations.asReadonly();
  public readonly loading = this._loading.asReadonly();

  loadLocations() {
    this._loading.set(true);

    return from(
      this.supabase.from('storage_locations').select('*').order('name'),
    )
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: ({ data, error }) => {
          if (error) {
            console.error('Error fetching storage locations', error);
            this._locations.set([]);
            return;
          }

          this._locations.set((data as StorageLocationRow[]).map(mapStorageLocationRow));
        },
        error: (err) => {
          console.error('Error fetching storage locations', err);
          this._locations.set([]);
        },
      });
  }

  getLocationById(id: string): Observable<StorageLocationDto | null> {
    return from(this.supabase.from('storage_locations').select('*').eq('id', id).single()).pipe(
      map(({ data, error }) => (error || !data ? null : mapStorageLocationRow(data as StorageLocationRow))),
    );
  }

  createLocation(location: CreateStorageLocationDto): Observable<StorageLocationDto | null> {
    return from(
      this.supabase
        .from('storage_locations')
        .insert(mapCreateStorageLocationPayload(location))
        .select('*')
        .single(),
    ).pipe(
      map(({ data, error }) => (error || !data ? null : mapStorageLocationRow(data as StorageLocationRow))),
    );
  }

  updateLocation(id: string, location: StorageLocationDto): Observable<StorageLocationDto | null> {
    return from(
      this.supabase
        .from('storage_locations')
        .update(mapStorageLocationUpdatePayload(location))
        .eq('id', id)
        .select('*')
        .single(),
    ).pipe(
      map(({ data, error }) => (error || !data ? null : mapStorageLocationRow(data as StorageLocationRow))),
    );
  }

  deleteLocation(id: string): Observable<boolean> {
    return from(this.supabase.from('storage_locations').delete().eq('id', id)).pipe(
      map(({ error }) => !error),
    );
  }
}
