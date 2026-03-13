import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PredenunciaVehiculoFacade } from '../../../../application/predenuncia/facades/predenuncia-vehiculo.facade';
import { AutoRowEntity } from '../../../../domain/predenuncia/entities/vehiculo.entity';

@Component({
    selector: 'app-predenuncia-vehiculo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './predenuncia-vehiculo.component.html',
    styleUrls: ['./predenuncia-vehiculo.component.scss'],
})
export class PredenunciaVehiculoComponent {
    private readonly facade = inject(PredenunciaVehiculoFacade);

    constructor() {
    }

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
        this.facade.onEditar(row);
    }

    onSiguiente(): void {
        const rows = this.rows;
        const form = this.form;

        const formularioVehiculoValido =
            !!form.placa &&
            !!form.marca &&
            !!form.submarca &&
            !!form.color;

        if (rows.length === 0 && !formularioVehiculoValido) {
            alert('Captura al menos un vehículo o agrégalo antes de continuar.');
            return;
        }

        if (rows.length === 0 && formularioVehiculoValido) {
            this.facade.onAgregarAuto();
        }

        this.facade.onSiguiente();
    }
}