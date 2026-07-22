export interface ApiResponse<T> {
  data: T | null;
  message: string;
  errors: string[] | null;
  isSuccess: boolean;
  statusCode: number;
  pagination?: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
