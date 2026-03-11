import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecuperacionInfoFacade } from '../../../../application/administracion/facades/recuperacion-info.facade';
import { RecuperacionLocationTypeEntity } from '../../../../domain/administracion/entities/recuperacion-info.entity';

@Component({
    selector: 'app-admin-recuperacion-info',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './recuperacion-info.component.html',
    styleUrls: ['./recuperacion-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRecuperacionInfoComponent {
    private readonly facade = inject(RecuperacionInfoFacade);

    get form() {
        return this.facade.form();
    }

    get denuncia() {
        return this.form.denuncia;
    }

    get locationType(): RecuperacionLocationTypeEntity {
        return this.form.locationType;
    }
    set locationType(value: RecuperacionLocationTypeEntity) {
        this.facade.setLocationType(value);
    }

    get documentoRecuperacion(): string {
        return this.form.documentoRecuperacion;
    }
    set documentoRecuperacion(value: string) {
        this.facade.updateField('documentoRecuperacion', value);
    }

    get fechaDocumento(): string {
        return this.form.fechaDocumento;
    }
    set fechaDocumento(value: string) {
        this.facade.updateField('fechaDocumento', value);
    }

    get horaDocumento(): string {
        return this.form.horaDocumento;
    }
    set horaDocumento(value: string) {
        this.facade.updateField('horaDocumento', value);
    }

    get agenciaMpDocumento(): string {
        return this.form.agenciaMpDocumento;
    }
    set agenciaMpDocumento(value: string) {
        this.facade.updateField('agenciaMpDocumento', value);
    }

    get agenteMpDocumento(): string {
        return this.form.agenteMpDocumento;
    }
    set agenteMpDocumento(value: string) {
        this.facade.updateField('agenteMpDocumento', value);
    }

    get fechaRecuperacion(): string {
        return this.form.fechaRecuperacion;
    }
    set fechaRecuperacion(value: string) {
        this.facade.updateField('fechaRecuperacion', value);
    }

    get horaRecuperacion(): string {
        return this.form.horaRecuperacion;
    }
    set horaRecuperacion(value: string) {
        this.facade.updateField('horaRecuperacion', value);
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

    get numeroExterior(): string {
        return this.form.numeroExterior;
    }
    set numeroExterior(value: string) {
        this.facade.updateField('numeroExterior', value);
    }

    get numeroInterior(): string {
        return this.form.numeroInterior;
    }
    set numeroInterior(value: string) {
        this.facade.updateField('numeroInterior', value);
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

    get documentosRecuperacion(): string[] {
        return this.form.documentosRecuperacion;
    }

    get agenciasMp(): string[] {
        return this.form.agenciasMp;
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

    setLocationType(type: RecuperacionLocationTypeEntity): void {
        this.facade.setLocationType(type);
    }

    onMapa(): void {
        this.facade.onMapa();
    }

    onNext(): void {
        this.facade.onNext();
    }
}
