import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DenunciaRoboFacade } from '../../../../application/denuncia/facades/denuncia-robo.facade';
import { LocationTypeEntity } from '../../../../domain/denuncia/entities/denuncia-robo.entity';

@Component({
    selector: 'app-denuncia-robo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './denuncia-robo.component.html',
    styleUrls: ['./denuncia-robo.component.scss'],
})
export class DenunciaRoboComponent {
    private readonly facade = inject(DenunciaRoboFacade);

    get form() {
        return this.facade.form();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaRegistro(): string {
        return this.form.fechaRegistro;
    }

    get averPrev(): string {
        return this.form.averPrev;
    }
    set averPrev(value: string) {
        this.facade.updateField('averPrev', value);
    }

    get averPrevConfirm(): string {
        return this.form.averPrevConfirm;
    }
    set averPrevConfirm(value: string) {
        this.facade.updateField('averPrevConfirm', value);
    }

    get fechaDenuncia(): string {
        return this.form.fechaDenuncia;
    }
    set fechaDenuncia(value: string) {
        this.facade.updateField('fechaDenuncia', value);
    }

    get horaDenuncia(): string {
        return this.form.horaDenuncia;
    }
    set horaDenuncia(value: string) {
        this.facade.updateField('horaDenuncia', value);
    }

    get agenciaMP(): string {
        return this.form.agenciaMP;
    }
    set agenciaMP(value: string) {
        this.facade.updateField('agenciaMP', value);
    }

    get agenteMP(): string {
        return this.form.agenteMP;
    }
    set agenteMP(value: string) {
        this.facade.updateField('agenteMP', value);
    }

    get fechaRobo(): string {
        return this.form.fechaRobo;
    }
    set fechaRobo(value: string) {
        this.facade.updateField('fechaRobo', value);
    }

    get horaRobo(): string {
        return this.form.horaRobo;
    }
    set horaRobo(value: string) {
        this.facade.updateField('horaRobo', value);
    }

    get entidades(): string[] {
        return this.form.entidades;
    }

    get municipios(): string[] {
        return this.form.municipios;
    }

    get colonias(): string[] {
        return this.form.colonias;
    }

    get entidad(): string {
        return this.form.entidad;
    }
    set entidad(value: string) {
        this.facade.updateField('entidad', value);
    }

    get municipio(): string {
        return this.form.municipio;
    }
    set municipio(value: string) {
        this.facade.updateField('municipio', value);
    }

    get colonia(): string {
        return this.form.colonia;
    }
    set colonia(value: string) {
        this.facade.updateField('colonia', value);
    }

    get calle(): string {
        return this.form.calle;
    }
    set calle(value: string) {
        this.facade.updateField('calle', value);
    }

    get numExterior(): string {
        return this.form.numExterior;
    }
    set numExterior(value: string) {
        this.facade.updateField('numExterior', value);
    }

    get numInterior(): string {
        return this.form.numInterior;
    }
    set numInterior(value: string) {
        this.facade.updateField('numInterior', value);
    }

    get cp(): string {
        return this.form.cp;
    }
    set cp(value: string) {
        this.facade.updateField('cp', value);
    }

    get referencia(): string {
        return this.form.referencia;
    }
    set referencia(value: string) {
        this.facade.updateField('referencia', value);
    }

    get latitud(): string {
        return this.form.latitud;
    }
    set latitud(value: string) {
        this.facade.updateField('latitud', value);
    }

    get longitud(): string {
        return this.form.longitud;
    }
    set longitud(value: string) {
        this.facade.updateField('longitud', value);
    }

    get tramo(): string {
        return this.form.tramo;
    }
    set tramo(value: string) {
        this.facade.updateField('tramo', value);
    }

    get kilometro(): string {
        return this.form.kilometro;
    }
    set kilometro(value: string) {
        this.facade.updateField('kilometro', value);
    }

    get locationType(): LocationTypeEntity {
        return this.form.locationType;
    }
    set locationType(value: LocationTypeEntity) {
        this.facade.setLocationType(value);
    }

    onMapa(): void {
        this.facade.onMapa();
    }

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}