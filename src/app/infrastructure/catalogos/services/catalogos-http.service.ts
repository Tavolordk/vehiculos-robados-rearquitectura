import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogosResponseDto } from '../dtos/catalogos.dto';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatalogosHttpService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiBaseUrl}/api/v1/catalogos`;

    getDelitos(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/delitos/delito`);
    }

    getMediosComision(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/delitos/medioComision`);
    }

    getArmas(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/delitos/arma`);
    }

    getModalidadesDelictivas(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/delitos/modalidadDelictiva`);
    }

    getModalidadesRobo(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/delitos/modalidadRobo`);
    }

    getTiposPersona(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/personas/tipoPersona`);
    }

    getSexos(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/personas/sexo`);
    }

    getColoresPiel(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/personas/colorPiel`);
    }

    getComplexiones(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/personas/complexion`);
    }

    getFuentesReporte(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/reportes/fuente`);
    }

    getTiposUsoReporte(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/reportes/tipoUso`);
    }

    getMotivosCancelacion(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/reportes/motivoCancelacion`);
    }

    getEstatusReporte(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/reportes/estatusReporte`);
    }

    getModosUbicacion(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/ubicacion/modoUbicacion`);
    }

    getTiposLugar(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/ubicacion/tipoLugar`);
    }

    getColoresVehiculo(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/vehiculos/color`);
    }

    getMarcasVehiculo(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/vehiculos/marca`);
    }

    getSubmarcasVehiculo(marcaId: number): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/vehiculos/submarca/${marcaId}`);
    }

    getTiposVehiculo(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/vehiculos/tipoVehiculo`);
    }

    getTiposUsoVehiculo(): Observable<CatalogosResponseDto> {
        return this.http.get<CatalogosResponseDto>(`${this.baseUrl}/vehiculos/tipoUsoVehiculo`);
    }
}