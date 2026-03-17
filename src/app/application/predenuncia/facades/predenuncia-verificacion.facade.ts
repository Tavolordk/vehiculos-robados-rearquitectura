import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PredenunciaVerificacionState } from '../state/predenuncia-verificacion.state';
import { PredenunciaRoboState } from '../state/predenuncia-robo.state';
import { PredenunciaDenuncianteState } from '../state/predenuncia-denunciante.state';
import { PredenunciaVehiculoState } from '../state/predenuncia-vehiculo.state';
import { PredenunciaRepository } from '../../../domain/predenuncia/repositories/predenuncia.repository';
import { PredenunciaMapper } from '../../../infrastructure/predenuncia/mappers/predenuncia.mapper';
import { PredenunciaRoboValidator } from '../validators/predenuncia-robo.validator';
import { PredenunciaDenuncianteValidator } from '../validators/predenuncia-denunciante.validator';
import { PredenunciaVehiculoValidator } from '../validators/predenuncia-vehiculo.validator';

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

    private resolveDescripcion(
        items: Array<{ id: string | number; descripcion: string }>,
        value: string | number | null | undefined,
        fallback = '—'
    ): string {
        const found = items.find((item) => String(item.id) === String(value));
        return found?.descripcion ?? (String(value ?? '').trim() || fallback);
    }

    private resolveTipoPersona(value: string | null | undefined): string {
        if (value === 'fisica') return 'Física';
        if (value === 'moral') return 'Moral';
        return value || '—';
    }

    hydrateFromForms(): void {
        const raw = PredenunciaMapper.toVerificacionEntityFromForms({
            folio: this.roboState.form().folio,
            fechaRegistro: this.roboState.form().fechaRegistro,
            roboForm: this.roboState.form(),
            denuncianteForm: this.denuncianteState.form(),
            vehiculoForm: this.vehiculoState.form(),
            vehiculos: this.vehiculoState.rows(),
        });

        const entidades = this.roboState.entidades();
        const municipios = this.roboState.municipios();
        const colonias = this.roboState.colonias();
        const modalidades = this.roboState.modalidades();
        const sexos = this.denuncianteState.sexos();

        this.state.setData({
            ...raw,
            robo: {
                ...raw.robo,
                entidad: this.resolveDescripcion(entidades, this.roboState.form().entidad),
                municipio:
                    this.roboState.form().municipio === '-1'
                        ? 'SIN CATÁLOGO DISPONIBLE AÚN'
                        : this.resolveDescripcion(municipios, this.roboState.form().municipio),
                colonia:
                    this.roboState.form().colonia === '-1'
                        ? 'SIN CATÁLOGO DISPONIBLE AÚN'
                        : this.resolveDescripcion(colonias, this.roboState.form().colonia),
                modalidad: this.resolveDescripcion(modalidades, this.roboState.form().modalidadRobo),
            },
            denunciante: {
                ...raw.denunciante,
                tipoPersona: this.resolveTipoPersona(this.denuncianteState.form().tipoPersona),
                sexo: this.resolveDescripcion(sexos, this.denuncianteState.form().sexo),
            },
        });
    }

    private validateBeforeSave(): boolean {
        const roboValidation = PredenunciaRoboValidator.validate(this.roboState.form());
        const denuncianteValidation = PredenunciaDenuncianteValidator.validate(this.denuncianteState.form());
        const vehiculoActualValidation = PredenunciaVehiculoValidator.validate(this.vehiculoState.form());
        const hasVehiculos = this.vehiculoState.rows().length > 0;

        this.roboState.setErrors(roboValidation.errors);
        this.denuncianteState.setErrors(denuncianteValidation.errors);
        this.vehiculoState.setErrors(vehiculoActualValidation.errors);

        if (!roboValidation.valid) {
            this.router.navigateByUrl('/predenuncia/robo');
            return false;
        }

        if (!denuncianteValidation.valid) {
            this.router.navigateByUrl('/predenuncia/denunciante');
            return false;
        }

        if (!hasVehiculos) {
            this.state.setError('Debe capturar y agregar al menos un vehículo antes de guardar.');
            this.router.navigateByUrl('/predenuncia/vehiculo');
            return false;
        }

        return true;
    }

    onGuardar(): void {
        const valid = this.validateBeforeSave();

        if (!valid) {
            return;
        }

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
                this.state.setError(null);

                // mientras no exista pantalla de éxito real, no navegues a una ruta inexistente
                // deja los datos del resultado disponibles en el state del router
                this.router.navigateByUrl('/predenuncia/verificacion', {
                    state: {
                        guardadoExitoso: true,
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