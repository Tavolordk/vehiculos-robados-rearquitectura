import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { PredenunciaVehiculoState } from '../state/predenuncia-vehiculo.state';
import {
    AutoRowEntity,
    PredenunciaVehiculoFormEntity,
} from '../../../domain/predenuncia/entities/vehiculo.entity';
import { CatalogosFacade } from '../../catalogos/facades/catalogos.facade';
import { Router } from '@angular/router';
import { SidebarProgressState } from '../../../shared/state/sidebar-progress.state';
import {
    PredenunciaVehiculoField,
    PredenunciaVehiculoValidator,
} from '../validators/predenuncia-vehiculo.validator';
import { CatalogItemEntity } from '../../../domain/catalogos/entities/catalog-item.entity';

@Injectable({ providedIn: 'root' })
export class PredenunciaVehiculoFacade {
    private readonly state = inject(PredenunciaVehiculoState);
    private readonly catalogosFacade = inject(CatalogosFacade);
    private readonly router = inject(Router);
    private readonly sidebarProgress = inject(SidebarProgressState);

    readonly form = this.state.form;
    readonly rows = this.state.rows;

    readonly marcas = this.state.marcas;
    readonly submarcas = this.state.submarcas;
    readonly colores = this.state.colores;
    readonly tiposVehiculo = this.state.tiposVehiculo;
    readonly entidades = this.state.entidades;
    readonly errors = this.state.errors;

    constructor() {
        this.cargarCatalogosIniciales();
    }

    private cargarCatalogosIniciales(): void {
        this.catalogosFacade.getMarcasVehiculo().subscribe({
            next: (items) => this.state.setMarcas(items),
            error: (error) => console.error('Error al cargar marcas', error),
        });

        this.catalogosFacade.getColoresVehiculo().subscribe({
            next: (items) => this.state.setColores(items),
            error: (error) => console.error('Error al cargar colores', error),
        });

        this.catalogosFacade.getTiposVehiculo().subscribe({
            next: (items) => this.state.setTiposVehiculo(items),
            error: (error) => console.error('Error al cargar tipos de vehículo', error),
        });

        this.catalogosFacade.getEntidades().subscribe({
            next: (items) => this.state.setEntidades(items),
            error: (error) => console.error('Error al cargar entidades', error),
        });
    }

    updateField(field: keyof PredenunciaVehiculoFormEntity, value: string): void {
        const normalized = this.normalizeField(field, value);
        this.state.updateForm({ [field]: normalized } as Partial<PredenunciaVehiculoFormEntity>);

        if (field === 'marca') {
            this.state.updateForm({ submarca: '' });
            this.state.setSubmarcas([]);

            if (normalized) {
                this.cargarSubmarcas(Number(normalized)).subscribe();
            }
        }

        this.validateCurrentForm();
    }

    private normalizeField(field: keyof PredenunciaVehiculoFormEntity, value: string): string {
        const raw = String(value ?? '');

        switch (field) {
            case 'serieVin':
                return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 17);

            case 'placa':
                return raw.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 10);

            case 'nrpv':
                return raw.toUpperCase().replace(/[^A-Z0-9]/g, '');

            case 'modelo':
                return raw.replace(/\D/g, '').slice(0, 4);

            case 'senas':
            case 'permiso':
                return raw.toUpperCase();

            default:
                return raw;
        }
    }

    cargarSubmarcas(marcaId: number): Observable<CatalogItemEntity[]> {
        return this.catalogosFacade.getSubmarcasVehiculo(marcaId).pipe(
            tap((items) => this.state.setSubmarcas(items))
        );
    }

    private getMarcaDescripcion(id: string): string {
        return this.state.marcas().find((item) => String(item.id) === String(id))?.descripcion ?? id;
    }

    private getSubmarcaDescripcion(id: string): string {
        return this.state.submarcas().find((item) => String(item.id) === String(id))?.descripcion ?? id;
    }

    private getColorDescripcion(id: string): string {
        return this.state.colores().find((item) => String(item.id) === String(id))?.descripcion ?? id;
    }

    private getMarcaIdByDescripcion(descripcion: string): string {
        return (
            this.state.marcas().find(
                (item) => item.descripcion?.trim().toUpperCase() === descripcion?.trim().toUpperCase()
            )?.id?.toString() ?? ''
        );
    }

    private getColorIdByDescripcion(descripcion: string): string {
        return (
            this.state.colores().find(
                (item) => item.descripcion?.trim().toUpperCase() === descripcion?.trim().toUpperCase()
            )?.id?.toString() ?? ''
        );
    }

    private getSubmarcaIdByDescripcion(descripcion: string, submarcas: CatalogItemEntity[]): string {
        return (
            submarcas.find(
                (item) => item.descripcion?.trim().toUpperCase() === descripcion?.trim().toUpperCase()
            )?.id?.toString() ?? ''
        );
    }

    createEmptyForm(): PredenunciaVehiculoFormEntity {
        const current = this.state.form();

        return {
            folio: current.folio,
            fechaRegistro: current.fechaRegistro,
            serieVin: '',
            placa: '',
            procedenciaPlaca: '',
            nrpv: '',
            modelo: '',
            entidad: '',
            marca: '',
            submarca: '',
            permiso: '',
            color: '',
            senas: '',
        };
    }

    validateCurrentForm(): boolean {
        const result = PredenunciaVehiculoValidator.validate(this.state.form());
        this.state.setErrors(result.errors);
        return result.valid;
    }

    validateForm(form: PredenunciaVehiculoFormEntity): {
        valid: boolean;
        errors: Partial<Record<PredenunciaVehiculoField, string>>;
    } {
        return PredenunciaVehiculoValidator.validate(form);
    }

    onBuscar(): void {
        console.log('buscar');
    }

    onAgregarAuto(): void {
        const valid = this.validateCurrentForm();

        if (!valid) {
            alert('Completa correctamente la información del vehículo antes de agregarlo.');
            return;
        }

        const form = this.state.form();

        const nuevaFila: AutoRowEntity = {
            serieVin: form.serieVin,
            placa: form.placa,
            procedenciaPlaca: form.procedenciaPlaca,
            nrpv: form.nrpv,
            modelo: form.modelo,
            entidad: form.entidad,
            marca: form.marca,
            submarca: form.submarca,
            permiso: form.permiso,
            color: form.color,
            senas: form.senas,

            marcaDescripcion: this.getMarcaDescripcion(form.marca),
            submarcaDescripcion: this.getSubmarcaDescripcion(form.submarca),
            colorDescripcion: this.getColorDescripcion(form.color),

            anio: form.modelo,
            selected: false,
        };

        this.state.addRow(nuevaFila);
        this.state.clearForm();
        this.state.setSubmarcas([]);
        this.state.clearErrors();
    }

    onEliminar(row: AutoRowEntity): void {
        const index = this.state.rows().findIndex((item) => item === row);

        if (index >= 0) {
            this.state.removeRow(index);
        }
    }

    buildEditForm(row: AutoRowEntity): Observable<PredenunciaVehiculoFormEntity> {
        if (row.marca) {
            return this.catalogosFacade.getSubmarcasVehiculo(Number(row.marca)).pipe(
                tap((items) => this.state.setSubmarcas(items)),
                map(() => ({
                    ...this.createEmptyForm(),
                    serieVin: row.serieVin ?? '',
                    placa: row.placa ?? '',
                    procedenciaPlaca: row.procedenciaPlaca ?? '',
                    nrpv: row.nrpv ?? '',
                    modelo: row.modelo ?? '',
                    entidad: row.entidad ?? '',
                    marca: row.marca ?? '',
                    submarca: row.submarca ?? '',
                    permiso: row.permiso ?? '',
                    color: row.color ?? '',
                    senas: row.senas ?? '',
                }))
            );
        }

        return new Observable((observer) => {
            observer.next({
                ...this.createEmptyForm(),
                serieVin: row.serieVin ?? '',
                placa: row.placa ?? '',
                procedenciaPlaca: row.procedenciaPlaca ?? '',
                nrpv: row.nrpv ?? '',
                modelo: row.modelo ?? '',
                entidad: row.entidad ?? '',
                marca: row.marca ?? '',
                submarca: row.submarca ?? '',
                permiso: row.permiso ?? '',
                color: row.color ?? '',
                senas: row.senas ?? '',
            });
            observer.complete();
        });
    }

    updateRowFromForm(index: number, form: PredenunciaVehiculoFormEntity): {
        valid: boolean;
        errors: Partial<Record<PredenunciaVehiculoField, string>>;
    } {
        const validation = this.validateForm(form);

        if (!validation.valid) {
            return validation;
        }

        const updatedRow: AutoRowEntity = {
            serieVin: form.serieVin,
            placa: form.placa,
            procedenciaPlaca: form.procedenciaPlaca,
            nrpv: form.nrpv,
            modelo: form.modelo,
            entidad: form.entidad,
            marca: form.marca,
            submarca: form.submarca,
            permiso: form.permiso,
            color: form.color,
            senas: form.senas,

            marcaDescripcion: this.getMarcaDescripcion(form.marca),
            submarcaDescripcion: this.getSubmarcaDescripcion(form.submarca),
            colorDescripcion: this.getColorDescripcion(form.color),

            anio: form.modelo,
            selected: false,
        };

        this.state.updateRow(index, updatedRow);
        return validation;
    }

    onSiguiente(): void {
        const rows = this.state.rows();
        const currentFormHasData =
            !!this.state.form().placa ||
            !!this.state.form().marca ||
            !!this.state.form().submarca ||
            !!this.state.form().modelo ||
            !!this.state.form().color;

        if (rows.length === 0 && currentFormHasData) {
            const currentValid = this.validateCurrentForm();
            if (!currentValid) {
                alert('Completa correctamente el vehículo capturado o elimínalo antes de continuar.');
                return;
            }
        }

        if (rows.length === 0 && !currentFormHasData) {
            alert('Debes capturar al menos un vehículo.');
            return;
        }

        this.sidebarProgress.markStepCompleted('predenuncia.vehiculo');
        this.router.navigateByUrl('/predenuncia/robo');
    }

    clearForm(): void {
        this.state.clearForm();
        this.state.setSubmarcas([]);
        this.state.clearErrors();
    }
}