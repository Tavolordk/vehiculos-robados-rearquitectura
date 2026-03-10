import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { APP_ENVIRONMENT, AppEnvironment } from '../../../core/config/app-environment.token';
import { buildApiUrl } from '../../../core/utils/url.util';
import { ConsultaVehiculoRepository } from '../../../domain/consulta-vehiculo/repositories/consulta-vehiculo.repository';
import { VehiculoEntity } from '../../../domain/consulta-vehiculo/entities/vehiculo.entity';
import { ConsultaVehiculoResponseDto } from '../dtos/consulta-vehiculo-response.dto';
import { ConsultaVehiculoMapper } from '../mappers/consulta-vehiculo.mapper';

@Injectable({ providedIn: 'root' })
export class ConsultaVehiculoHttpRepository extends ConsultaVehiculoRepository {
    private readonly http = inject(HttpClient);
    private readonly environment = inject<AppEnvironment>(APP_ENVIRONMENT);

    /**
     * Ajusta esta ruta al endpoint real del backend
     */
    private readonly consultaEndpoint = buildApiUrl(
        this.environment.apiBaseUrl,
        'vehiculos/consulta'
    );

    override consultarPorVin(vin: string): Observable<VehiculoEntity | null> {
        const params = new HttpParams().set('vin', vin);

        return this.http
            .get<ConsultaVehiculoResponseDto | null>(this.consultaEndpoint, { params })
            .pipe(
                map((response) => {
                    if (!response) {
                        return null;
                    }

                    const hasVin = String(response.vin ?? '').trim().length > 0;
                    return hasVin ? ConsultaVehiculoMapper.toEntity(response) : null;
                }),
                catchError((error: HttpErrorResponse) => this.handleHttpError(error))
            );
    }

    private handleHttpError(error: HttpErrorResponse) {
        if (error.status === 404) {
            return of(null);
        }

        const message =
            error.error?.mensaje ||
            error.error?.message ||
            error.message ||
            'No fue posible consultar el vehículo.';

        return throwError(() => ({
            status: error.status ?? 0,
            message,
        }));
    }
}