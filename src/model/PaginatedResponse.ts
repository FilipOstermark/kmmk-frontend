export interface PaginatedResponse<T> {
  count: number
  page: number
  lastPage: number
  results: T[]
}
