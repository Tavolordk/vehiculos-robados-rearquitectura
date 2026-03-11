import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PredenunciaRoboFacade } from '../../../../application/predenuncia/facades/predenuncia-robo.facade';
import { LugarTipoEntity } from '../../../../domain/predenuncia/entities/predenuncia-robo.entity';

@Component({
    selector: 'app-predenuncia-robo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './predenuncia-robo.component.html',
    styleUrls: ['./predenuncia-robo.component.scss'],
})
export class PredenunciaRoboComponent {
    private readonly facade = inject(PredenunciaRoboFacade);

    get form() {
        return this.facade.form();
    }

    get modalidades() {
        return this.facade.modalidades();
    }

    get entidades() {
        return this.facade.entidades();
    }

    get municipios() {
        return this.facade.municipios();
    }

    get colonias() {
        return this.facade.colonias();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaRegistro(): string {
        return this.form.fechaRegistro;
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

    get modalidadRobo(): string {
        return this.form.modalidadRobo;
    }
    set modalidadRobo(value: string) {
        this.facade.updateField('modalidadRobo', value);
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

    get lugarTipo(): LugarTipoEntity {
        return this.form.lugarTipo;
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

    get numExt(): string {
        return this.form.numExt;
    }
    set numExt(value: string) {
        this.facade.updateField('numExt', value);
    }

    get numInt(): string {
        return this.form.numInt;
    }
    set numInt(value: string) {
        this.facade.updateField('numInt', value);
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

    setLugarTipo(tipo: LugarTipoEntity): void {
        this.facade.setLugarTipo(tipo);
    }

    onMapa(): void {
        this.facade.onMapa();
    }

    onNext(): void {
        this.facade.onNext();
    }
}