import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PredenunciaVerificacionState } from '../state/predenuncia-verificacion.state';
import { PredenunciaRoboState } from '../state/predenuncia-robo.state';
import { PredenunciaDenuncianteState } from '../state/predenuncia-denunciante.state';
import { PredenunciaVehiculoState } from '../state/predenuncia-vehiculo.state';
import { PredenunciaRepository } from '../../../domain/predenuncia/repositories/predenuncia.repository';
import { PredenunciaMapper } from '../../../infrastructure/predenuncia/mappers/predenuncia.mapper';

@Injectable({ providedIn: 'root' })
export class PredenunciaVerificacionFacade {
    private readonly state = inject(PredenunciaVerificacionState);
    private readonly roboState = inject(PredenunciaRoboState);
    private readonly denuncianteState = inject(PredenunciaDenuncianteState);
    private readonly vehiculoState = inject(PredenunciaVehiculoState);
    private readonly repository = inject(PredenunciaRepository);
    private readonly router = inject(Router);

    readonly data = this.state.data;
    readonly loading = this.state.loading;
    readonly error = this.state.error;

    goToRobo(): void {
        this.router.navigateByUrl('/predenuncia/robo');
    }

    goToDenunciante(): void {
        this.router.navigateByUrl('/predenuncia/denunciante');
    }

    goToVehiculo(): void {
        this.router.navigateByUrl('/predenuncia/vehiculo');
    }

    hydrateFromForms(): void {
        const snapshot = PredenunciaMapper.toVerificacionEntityFromForms({
            folio: this.roboState.form().folio,
            fechaRegistro: this.roboState.form().fechaRegistro,
            roboForm: this.roboState.form(),
            denuncianteForm: this.denuncianteState.form(),
            vehiculoForm: this.vehiculoState.form(),
            vehiculos: this.vehiculoState.rows(),
        });

        this.state.setData(snapshot);
    }

    onGuardar(): void {
        this.state.setLoading(true);
        this.state.setError(null);

        const payload = PredenunciaMapper.buildCrearRequestFromForms({
            roboForm: this.roboState.form(),
            denuncianteForm: this.denuncianteState.form(),
            vehiculoForm: this.vehiculoState.form(),
            vehiculos: this.vehiculoState.rows(),
            usuarioId: 1,
            entidadId: Number(this.roboState.form().entidad || 0),
            tzUsuario: 'America/Mexico_City',
            tipoVehiculoId: null,
            tipoUsoId: null,
        });

        this.repository.crear(payload).subscribe({
            next: (response) => {
                this.hydrateFromForms();

                this.state.setLoading(false);

                this.router.navigateByUrl('/dashboard/guardado-exitoso', {
                    state: {
                        reporteId: response.reporteId,
                        folio: response.folio,
                        codigo: response.codigo,
                        mensaje: response.mensaje,
                    },
                });
            },
            error: (error) => {
                this.state.setLoading(false);
                this.state.setError(error?.message ?? 'No fue posible guardar la predenuncia.');
            },
        });
    }
}