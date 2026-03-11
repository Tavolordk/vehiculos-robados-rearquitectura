import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DenunciaDenuncianteFacade } from '../../../../application/denuncia/facades/denuncia-denunciante.facade';
import { TipoPersonaDenunciaEntity } from '../../../../domain/denuncia/entities/denuncia-denunciante.entity';

@Component({
    selector: 'app-denuncia-denunciante',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './denuncia-denunciante.component.html',
    styleUrls: ['./denuncia-denunciante.component.scss'],
})
export class DenunciaDenuncianteComponent {
    private readonly facade = inject(DenunciaDenuncianteFacade);

    get form() {
        return this.facade.form();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaRegistro(): string {
        return this.form.fechaRegistro;
    }

    get tipoPersona(): TipoPersonaDenunciaEntity {
        return this.form.tipoPersona;
    }
    set tipoPersona(value: TipoPersonaDenunciaEntity) {
        this.facade.setTipoPersona(value);
    }

    get nombreRazon(): string {
        return this.form.nombreRazon;
    }
    set nombreRazon(value: string) {
        this.facade.updateField('nombreRazon', value);
    }

    get primerApellido(): string {
        return this.form.primerApellido;
    }
    set primerApellido(value: string) {
        this.facade.updateField('primerApellido', value);
    }

    get segundoApellido(): string {
        return this.form.segundoApellido;
    }
    set segundoApellido(value: string) {
        this.facade.updateField('segundoApellido', value);
    }

    get curp(): string {
        return this.form.curp;
    }
    set curp(value: string) {
        this.facade.updateField('curp', value);
    }

    get rfc(): string {
        return this.form.rfc;
    }
    set rfc(value: string) {
        this.facade.updateField('rfc', value);
    }

    get sexo(): string {
        return this.form.sexo;
    }
    set sexo(value: string) {
        this.facade.updateField('sexo', value);
    }

    get telefono(): string {
        return this.form.telefono;
    }
    set telefono(value: string) {
        this.facade.updateField('telefono', value);
    }

    get correo(): string {
        return this.form.correo;
    }
    set correo(value: string) {
        this.facade.updateField('correo', value);
    }

    get mismoDomicilioRobo(): boolean {
        return this.form.mismoDomicilioRobo;
    }
    set mismoDomicilioRobo(value: boolean) {
        this.facade.updateField('mismoDomicilioRobo', value);
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

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}