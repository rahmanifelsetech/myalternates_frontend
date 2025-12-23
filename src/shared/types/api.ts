/**
 * Base API Types
 * Core types for all API operations - errors, responses, pagination
 */

// ============================================
// ERROR TYPES
// ============================================

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  details?: Record<string, string>;
}

// ============================================
// RESPONSE TYPES
// ============================================

/**
 * Base API response structure
 * All paginated and most non-paginated endpoints follow this structure
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  metaData?: Record<string, unknown>;
}

/**
 * Pagination metadata
 * Used in PaginatedResponse to provide pagination information
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Paginated API response
 * Extends ApiResponse with pagination metadata
 * Used when endpoint returns a list of items with pagination info
 */
export interface PaginatedResponse<T> extends Omit<ApiResponse<T[]>, 'metaData'> {
  metaData: PaginationMeta;
}

/**
 * Non-paginated list response
 * For endpoints that return a list without pagination
 */
export interface ListResponse<T> extends ApiResponse<T[]> {}

/**
 * Single item response
 * For endpoints that return a single item
 */
export interface SingleResponse<T> extends ApiResponse<T> {}

/**
 * Empty response
 * For endpoints that don't return data (DELETE, etc.)
 */
export interface EmptyResponse extends ApiResponse<null> {}

// ============================================
// COMMON PARAMETERS
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
