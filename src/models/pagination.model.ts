export interface PaginationResponse<T>{
    items: T[];
    totalItems: number;
    hasNextPage: boolean;
    currentPage: number;
    page: number;
    pageSize: number;
    totalPages: number;
}