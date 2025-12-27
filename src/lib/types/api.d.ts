
// error response
declare type ErrorResponse = {
    message: string
    code: number
}

// success response
declare type SuccessResponse<T> = {
    message: string
} & T;

// API response
declare type APIResponse<T> = ErrorResponse | SuccessResponse<T>

// pagination response with data 
declare type PaginationResponse<T> = {
   metadata: {
      currentPage: number
      numberOfPages: number
      limit: number
      total?: number
   },
   [key: string]: T
}
