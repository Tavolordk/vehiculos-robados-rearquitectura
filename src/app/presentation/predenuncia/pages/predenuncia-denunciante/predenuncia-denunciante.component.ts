import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PredenunciaDenuncianteFacade } from '../../../../application/predenuncia/facades/predenuncia-denunciante.facade';
import { TipoPersonaEntity } from '../../../../domain/predenuncia/entities/predenuncia-denunciante.entity';

@Component({
    selector: 'app-predenuncia-denunciante',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './predenuncia-denunciante.component.html',
    styleUrls: ['./predenuncia-denunciante.component.scss'],
})
export class PredenunciaDenuncianteComponent {
    private readonly facade = inject(PredenunciaDenuncianteFacade);

    get form() {
        return this.facade.form();
    }

    get tiposPersona() {
        return this.facade.tiposPersona();
    }

    get sexos() {
        return this.facade.sexos();
    }

    get errors() {
        return this.facade.errors();
    }

    get submitted(): boolean {
        return this.facade.submitted();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaRegistro(): string {
        return this.form.fechaRegistro;
    }

    get tipoPersona(): TipoPersonaEntity {
        return this.form.tipoPersona;
    }

    get nombreRazonSocial(): string {
        return this.form.nombreRazonSocial;
    }
    set nombreRazonSocial(value: string) {
        this.facade.updateField('nombreRazonSocial', value);
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

    setTipoPersona(tipo: TipoPersonaEntity): void {
        this.facade.setTipoPersona(tipo);
    }

    hasError(field: Parameters<PredenunciaDenuncianteFacade['hasError']>[0]): boolean {
        return this.facade.hasError(field);
    }

    getError(field: Parameters<PredenunciaDenuncianteFacade['getError']>[0]): string {
        return this.facade.getError(field);
    }

    onNext(): void {
        this.facade.onNext();
    }
}
