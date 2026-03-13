import { Injectable, inject } from '@angular/core';
import { PredenunciaVehiculoState } from '../state/predenuncia-vehiculo.state';
import { AutoRowEntity } from '../../../domain/predenuncia/entities/vehiculo.entity';
import { CatalogosFacade } from '../../catalogos/facades/catalogos.facade';
import { Router } from '@angular/router';
import { SidebarProgressState } from '../../../shared/state/sidebar-progress.state';
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

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value });

        if (field === 'marca') {
            this.state.clearSubmarcas();

            if (value) {
                this.cargarSubmarcas(Number(value));
            }
        }
    }

    private cargarSubmarcas(marcaId: number): void {
        this.catalogosFacade.getSubmarcasVehiculo(marcaId).subscribe({
            next: (items) => this.state.setSubmarcas(items),
            error: (error) => console.error('Error al cargar submarcas', error),
        });
    }

    onBuscar(): void {
        console.log('buscar');
    }

    onAgregarAuto(): void {
        const form = this.state.form();

        const nuevaFila: AutoRowEntity = {
            marca: form.marca,
            submarca: form.submarca,
            anio: form.modelo,
            color: form.color,
            placa: form.placa,
            selected: false,
        };

        this.state.addRow(nuevaFila);
        this.state.clearForm();
        this.state.clearSubmarcas();
    }

    onEliminar(row: AutoRowEntity): void {
        const index = this.state.rows().findIndex((item) => item === row);

        if (index >= 0) {
            this.state.removeRow(index);
        }
    }

    onEditar(row: AutoRowEntity): void {
        this.state.updateForm({
            marca: row.marca,
            submarca: row.submarca,
            modelo: row.anio,
            color: row.color,
            placa: row.placa,
        });
    }

    onSiguiente(): void {
        this.sidebarProgress.markStepCompleted('predenuncia.vehiculo');
        this.router.navigateByUrl('/predenuncia/robo');
    }

    clearForm(): void {
        this.state.clearForm();
        this.state.clearSubmarcas();
    }
}