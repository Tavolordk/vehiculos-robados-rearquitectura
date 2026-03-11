import { CatalogItemEntity } from '../../../domain/catalogos/entities/catalog-item.entity';
import { CatalogItemDto } from '../dtos/catalogos.dto';

export class CatalogosMapper {
    static toEntity(dto: CatalogItemDto): CatalogItemEntity {
        return {
            id: dto.id,
            descripcion: dto.descripcion ?? '',
        };
    }
}