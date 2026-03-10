import { CatalogItemEntity } from '../../../domain/catalogos/entities/catalog-item.entity';
import { CatalogItemDto } from '../dtos/catalog-item.dto';

export class CatalogosMapper {
    static toEntity(dto: CatalogItemDto): CatalogItemEntity {
        return {
            id: dto.id,
            descripcion: dto.descripcion ?? '',
        };
    }

    static toEntities(items: CatalogItemDto[] | null | undefined): CatalogItemEntity[] {
        return (items ?? []).map((item) => this.toEntity(item));
    }
}