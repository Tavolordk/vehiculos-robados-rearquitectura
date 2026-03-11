import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentacionPropietarioFacade } from '../../../../application/administracion/facades/documentacion-propietario.facade';
import { TipoPersonaDocumentacionEntity } from '../../../../domain/administracion/entities/documentacion-propietario.entity';

@Component({
    selector: 'app-documentacion-propietario',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './documentacion-propietario.component.html',
    styleUrls: ['./documentacion-propietario.component.scss'],
})
export class DocumentacionPropietarioComponent {
    private readonly facade = inject(DocumentacionPropietarioFacade);

    get data() {
        return this.facade.data();
    }

    get folio(): string {
        return this.data.folio;
    }

    get fechaHoraRegistro(): string {
        return this.data.fechaHoraRegistro;
    }

    get tipoPersona(): TipoPersonaDocumentacionEntity {
        return this.data.form.tipoPersona;
    }
    set tipoPersona(value: TipoPersonaDocumentacionEntity) {
        this.facade.updateField('tipoPersona', value);
    }

    get nombres(): string {
        return this.data.form.nombres;
    }
    set nombres(value: string) {
        this.facade.updateField('nombres', value);
    }

    get primerApellido(): string {
        return this.data.form.primerApellido;
    }
    set primerApellido(value: string) {
        this.facade.updateField('primerApellido', value);
    }

    get segundoApellido(): string {
        return this.data.form.segundoApellido;
    }
    set segundoApellido(value: string) {
        this.facade.updateField('segundoApellido', value);
    }

    get numeroFactura(): string {
        return this.data.form.numeroFactura;
    }
    set numeroFactura(value: string) {
        this.facade.updateField('numeroFactura', value);
    }

    get fechaFactura(): string {
        return this.data.form.fechaFactura;
    }

    get credencialElector(): string {
        return this.data.form.credencialElector;
    }
    set credencialElector(value: string) {
        this.facade.updateField('credencialElector', value);
    }

    get pasaporte(): string {
        return this.data.form.pasaporte;
    }
    set pasaporte(value: string) {
        this.facade.updateField('pasaporte', value);
    }

    get cedulaProfesional(): string {
        return this.data.form.cedulaProfesional;
    }
    set cedulaProfesional(value: string) {
        this.facade.updateField('cedulaProfesional', value);
    }

    get comprobanteDomicilio(): string {
        return this.data.form.comprobanteDomicilio;
    }
    set comprobanteDomicilio(value: string) {
        this.facade.updateField('comprobanteDomicilio', value);
    }

    get otroDocumento(): string {
        return this.data.form.otroDocumento;
    }
    set otroDocumento(value: string) {
        this.facade.updateField('otroDocumento', value);
    }

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}