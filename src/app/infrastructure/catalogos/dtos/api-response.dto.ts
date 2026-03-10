export interface ApiResponseDto<T> {
    success: boolean;
    data: T | null;
    errors: string[] | null;
    traceId: string | null;
    timestamp: string;
}