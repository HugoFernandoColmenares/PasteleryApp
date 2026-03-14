export interface ApiResponse<T> {
  data: T | null;
  message: string;
  errors: string[] | null;
  isSuccess: boolean;
  statusCode: number;
}
