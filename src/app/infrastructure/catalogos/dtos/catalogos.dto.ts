export interface CatalogItemDto {
    id: number;
    descripcion: string | null;
}

export interface CatalogosResponseDto {
    success: boolean;
    data: CatalogItemDto[] | null;
    errors: string[] | null;
    traceId: string | null;
    timestamp: string;
}