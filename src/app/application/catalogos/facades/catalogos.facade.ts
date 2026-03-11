import { Injectable, inject } from '@angular/core';
import { ObtenerCatalogosUseCase } from '../use-cases/obtener-catalogos.use-case';

@Injectable({ providedIn: 'root' })
export class CatalogosFacade {
    private readonly useCase = inject(ObtenerCatalogosUseCase);

    getDelitos() { return this.useCase.getDelitos(); }
    getMediosComision() { return this.useCase.getMediosComision(); }
    getArmas() { return this.useCase.getArmas(); }
    getModalidadesDelictivas() { return this.useCase.getModalidadesDelictivas(); }
    getModalidadesRobo() { return this.useCase.getModalidadesRobo(); }
    getTiposPersona() { return this.useCase.getTiposPersona(); }
    getSexos() { return this.useCase.getSexos(); }
    getColoresPiel() { return this.useCase.getColoresPiel(); }
    getComplexiones() { return this.useCase.getComplexiones(); }
    getFuentesReporte() { return this.useCase.getFuentesReporte(); }
    getTiposUsoReporte() { return this.useCase.getTiposUsoReporte(); }
    getMotivosCancelacion() { return this.useCase.getMotivosCancelacion(); }
    getEstatusReporte() { return this.useCase.getEstatusReporte(); }
    getModosUbicacion() { return this.useCase.getModosUbicacion(); }
    getTiposLugar() { return this.useCase.getTiposLugar(); }
    getColoresVehiculo() { return this.useCase.getColoresVehiculo(); }
    getMarcasVehiculo() { return this.useCase.getMarcasVehiculo(); }
    getSubmarcasVehiculo(marcaId: number) { return this.useCase.getSubmarcasVehiculo(marcaId); }
    getTiposVehiculo() { return this.useCase.getTiposVehiculo(); }
    getTiposUsoVehiculo() { return this.useCase.getTiposUsoVehiculo(); }
}