import { Injectable, inject } from '@angular/core';
import { CatalogosRepository } from '../../../domain/catalogos/repositories/catalogos.repository';

@Injectable({ providedIn: 'root' })
export class ObtenerCatalogosUseCase {
    private readonly repository = inject(CatalogosRepository);

    getDelitos() { return this.repository.getDelitos(); }
    getMediosComision() { return this.repository.getMediosComision(); }
    getArmas() { return this.repository.getArmas(); }
    getModalidadesDelictivas() { return this.repository.getModalidadesDelictivas(); }
    getModalidadesRobo() { return this.repository.getModalidadesRobo(); }
    getTiposPersona() { return this.repository.getTiposPersona(); }
    getSexos() { return this.repository.getSexos(); }
    getColoresPiel() { return this.repository.getColoresPiel(); }
    getComplexiones() { return this.repository.getComplexiones(); }
    getFuentesReporte() { return this.repository.getFuentesReporte(); }
    getTiposUsoReporte() { return this.repository.getTiposUsoReporte(); }
    getMotivosCancelacion() { return this.repository.getMotivosCancelacion(); }
    getEstatusReporte() { return this.repository.getEstatusReporte(); }
    getModosUbicacion() { return this.repository.getModosUbicacion(); }
    getTiposLugar() { return this.repository.getTiposLugar(); }
    getColoresVehiculo() { return this.repository.getColoresVehiculo(); }
    getMarcasVehiculo() { return this.repository.getMarcasVehiculo(); }
    getSubmarcasVehiculo(marcaId: number) { return this.repository.getSubmarcasVehiculo(marcaId); }
    getTiposVehiculo() { return this.repository.getTiposVehiculo(); }
    getTiposUsoVehiculo() { return this.repository.getTiposUsoVehiculo(); }
    getEntidades(soloActivos = true, nombre?: string) {
        return this.repository.getEntidades(soloActivos, nombre);
    }
}