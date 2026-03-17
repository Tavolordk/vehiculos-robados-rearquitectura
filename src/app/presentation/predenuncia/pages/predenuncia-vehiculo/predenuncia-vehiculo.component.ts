import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PredenunciaVehiculoFacade } from '../../../../application/predenuncia/facades/predenuncia-vehiculo.facade';
import {
    AutoRowEntity,
    PredenunciaVehiculoFormEntity,
} from '../../../../domain/predenuncia/entities/vehiculo.entity';
import { PredenunciaVehiculoField } from '../../../../application/predenuncia/validators/predenuncia-vehiculo.validator';

@Component({
    selector: 'app-predenuncia-vehiculo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './predenuncia-vehiculo.component.html',
    styleUrls: ['./predenuncia-vehiculo.component.scss'],
})
export class PredenunciaVehiculoComponent {
    private readonly facade = inject(PredenunciaVehiculoFacade);

    showEditModal = false;
    editIndex: number | null = null;
    editErrors: Partial<Record<PredenunciaVehiculoField, string>> = {};
    editForm: PredenunciaVehiculoFormEntity = this.facade.createEmptyForm();

    get form() {
        return this.facade.form();
    }

    get rows() {
        return this.facade.rows();
    }

    get marcas() {
        return this.facade.marcas();
    }

    get submarcas() {
        return this.facade.submarcas();
    }

    get colores() {
        return this.facade.colores();
    }

    get tiposVehiculo() {
        return this.facade.tiposVehiculo();
    }

    get entidades() {
        return this.facade.entidades();
    }

    get errors() {
        return this.facade.errors();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaRegistro(): string {
        return this.form.fechaRegistro;
    }

    get serieVin(): string {
        return this.form.serieVin;
    }
    set serieVin(value: string) {
        this.facade.updateField('serieVin', value);
    }

    get placa(): string {
        return this.form.placa;
    }
    set placa(value: string) {
        this.facade.updateField('placa', value);
    }

    get procedenciaPlaca(): string {
        return this.form.procedenciaPlaca;
    }
    set procedenciaPlaca(value: string) {
        this.facade.updateField('procedenciaPlaca', value);
    }

    get nrpv(): string {
        return this.form.nrpv;
    }
    set nrpv(value: string) {
        this.facade.updateField('nrpv', value);
    }

    get modelo(): string {
        return this.form.modelo;
    }
    set modelo(value: string) {
        this.facade.updateField('modelo', value);
    }

    get entidad(): string {
        return this.form.entidad;
    }
    set entidad(value: string) {
        this.facade.updateField('entidad', value);
    }

    get marca(): string {
        return this.form.marca;
    }
    set marca(value: string) {
        this.facade.updateField('marca', value);
    }

    get submarca(): string {
        return this.form.submarca;
    }
    set submarca(value: string) {
        this.facade.updateField('submarca', value);
    }

    get permiso(): string {
        return this.form.permiso;
    }
    set permiso(value: string) {
        this.facade.updateField('permiso', value);
    }

    get color(): string {
        return this.form.color;
    }
    set color(value: string) {
        this.facade.updateField('color', value);
    }

    get senas(): string {
        return this.form.senas;
    }
    set senas(value: string) {
        this.facade.updateField('senas', value);
    }

    hasError(field: PredenunciaVehiculoField): boolean {
        return !!this.errors[field];
    }

    error(field: PredenunciaVehiculoField): string {
        return this.errors[field] ?? '';
    }

    hasEditError(field: PredenunciaVehiculoField): boolean {
        return !!this.editErrors[field];
    }

    editError(field: PredenunciaVehiculoField): string {
        return this.editErrors[field] ?? '';
    }

    onBuscar(): void {
        this.facade.onBuscar();
    }

    onAgregarAuto(): void {
        this.facade.onAgregarAuto();
    }

    onEliminar(row: AutoRowEntity): void {
        this.facade.onEliminar(row);
    }

    onEditar(row: AutoRowEntity): void {
        const index = this.rows.findIndex((item) => item === row);

        if (index < 0) {
            return;
        }

        this.editIndex = index;
        this.editErrors = {};

        this.facade.buildEditForm(row).subscribe({
            next: (form) => {
                this.editForm = { ...form };
                this.showEditModal = true;
            },
            error: (error) => {
                console.error('Error al preparar edición de vehículo', error);
            },
        });
    }

    onEditMarcaChange(value: string): void {
        this.editForm = {
            ...this.editForm,
            marca: value,
            submarca: '',
        };

        if (!value) {
            return;
        }

        this.facade.cargarSubmarcas(Number(value)).subscribe({
            error: (error) => console.error('Error al cargar submarcas del modal', error),
        });
    }

    onSaveEdit(): void {
        if (this.editIndex === null) {
            return;
        }

        const result = this.facade.updateRowFromForm(this.editIndex, this.editForm);
        this.editErrors = result.errors;

        if (!result.valid) {
            return;
        }

        this.closeEditModal();
    }

    closeEditModal(): void {
        this.showEditModal = false;
        this.editIndex = null;
        this.editErrors = {};
        this.editForm = this.facade.createEmptyForm();
    }

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}