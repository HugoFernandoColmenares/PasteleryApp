import { ApiResponse } from '@core/models/api-response.model';

export function createSuccessResponse<T>(
  data: T,
  message = 'Success',
  statusCode = 200,
): ApiResponse<T> {
  return {
    data,
    message,
    errors: null,
    isSuccess: true,
    statusCode,
  };
}

export function createErrorResponse<T>(
  message: string,
  statusCode = 400,
  errors: string[] | null = null,
): ApiResponse<T> {
  return {
    data: null,
    message,
    errors: errors ?? [message],
    isSuccess: false,
    statusCode,
  };
}
