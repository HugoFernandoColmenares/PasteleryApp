export interface StorageLocationDto {
  id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}

export interface CreateStorageLocationDto {
  name: string;
  code: string;
  description: string;
}
