import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DenunciaVehiculoFacade } from '../../../../application/denuncia/facades/denuncia-vehiculo.facade';

@Component({
    selector: 'app-denuncia-vehiculo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './denuncia-vehiculo.component.html',
    styleUrls: ['./denuncia-vehiculo.component.scss'],
})
export class DenunciaVehiculoComponent {
    private readonly facade = inject(DenunciaVehiculoFacade);

    get form() {
        return this.facade.form();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaHoraRegistro(): string {
        return this.form.fechaHoraRegistro;
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

    get tipoVehiculo(): string {
        return this.form.tipoVehiculo;
    }
    set tipoVehiculo(value: string) {
        this.facade.updateField('tipoVehiculo', value);
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

    get tipoUso(): string {
        return this.form.tipoUso;
    }
    set tipoUso(value: string) {
        this.facade.updateField('tipoUso', value);
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

    get senasParticulares(): string {
        return this.form.senasParticulares;
    }
    set senasParticulares(value: string) {
        this.facade.updateField('senasParticulares', value);
    }

    get noMotor(): string {
        return this.form.noMotor;
    }
    set noMotor(value: string) {
        this.facade.updateField('noMotor', value);
    }

    get loadingBuscar(): boolean {
        return this.form.loadingBuscar;
    }

    get procedencias() {
        return this.facade.procedencias();
    }

    get tiposVehiculoList() {
        return this.facade.tiposVehiculoList();
    }

    get modelosList() {
        return this.facade.modelosList();
    }

    get entidadesList() {
        return this.facade.entidadesList();
    }

    get tiposUsoList() {
        return this.facade.tiposUsoList();
    }

    get marcasList() {
        return this.facade.marcasList();
    }

    get submarcasList() {
        return this.facade.submarcasList();
    }

    get coloresList() {
        return this.facade.coloresList();
    }

    get rows() {
        return this.facade.rows();
    }

    onMarcaChange(): void {
        this.facade.onMarcaChange();
    }

    async onBuscarPlacaVin(): Promise<void> {
        await this.facade.onBuscarPlacaVin();
    }

    onAgregarAuto(): void {
        this.facade.onAgregarAuto();
    }

    onEliminarRow(index: number): void {
        this.facade.onEliminarRow(index);
    }

    onEditarRow(index: number): void {
        this.facade.onEditarRow(index);
    }

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}