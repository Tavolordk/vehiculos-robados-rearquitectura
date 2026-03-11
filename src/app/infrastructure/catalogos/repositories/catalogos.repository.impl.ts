import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CatalogosRepository } from '../../../domain/catalogos/repositories/catalogos.repository';
import { CatalogItemEntity } from '../../../domain/catalogos/entities/catalog-item.entity';
import { CatalogosHttpService } from '../services/catalogos-http.service';
import { CatalogosMapper } from '../mappers/catalogos.mapper';
import { CatalogosResponseDto } from '../dtos/catalogos.dto';

@Injectable({ providedIn: 'root' })
export class CatalogosRepositoryImpl extends CatalogosRepository {
    private readonly api = inject(CatalogosHttpService);

    private mapResponse(source$: Observable<CatalogosResponseDto>): Observable<CatalogItemEntity[]> {
        return source$.pipe(
            map((response) => {
                const items = response?.data ?? [];
                return items.map(CatalogosMapper.toEntity);
            })
        );
    }

    getDelitos() { return this.mapResponse(this.api.getDelitos()); }
    getMediosComision() { return this.mapResponse(this.api.getMediosComision()); }
    getArmas() { return this.mapResponse(this.api.getArmas()); }
    getModalidadesDelictivas() { return this.mapResponse(this.api.getModalidadesDelictivas()); }
    getModalidadesRobo() { return this.mapResponse(this.api.getModalidadesRobo()); }
    getTiposPersona() { return this.mapResponse(this.api.getTiposPersona()); }
    getSexos() { return this.mapResponse(this.api.getSexos()); }
    getColoresPiel() { return this.mapResponse(this.api.getColoresPiel()); }
    getComplexiones() { return this.mapResponse(this.api.getComplexiones()); }
    getFuentesReporte() { return this.mapResponse(this.api.getFuentesReporte()); }
    getTiposUsoReporte() { return this.mapResponse(this.api.getTiposUsoReporte()); }
    getMotivosCancelacion() { return this.mapResponse(this.api.getMotivosCancelacion()); }
    getEstatusReporte() { return this.mapResponse(this.api.getEstatusReporte()); }
    getModosUbicacion() { return this.mapResponse(this.api.getModosUbicacion()); }
    getTiposLugar() { return this.mapResponse(this.api.getTiposLugar()); }
    getColoresVehiculo() { return this.mapResponse(this.api.getColoresVehiculo()); }
    getMarcasVehiculo() { return this.mapResponse(this.api.getMarcasVehiculo()); }
    getSubmarcasVehiculo(marcaId: number) { return this.mapResponse(this.api.getSubmarcasVehiculo(marcaId)); }
    getTiposVehiculo() { return this.mapResponse(this.api.getTiposVehiculo()); }
    getTiposUsoVehiculo() { return this.mapResponse(this.api.getTiposUsoVehiculo()); }
}