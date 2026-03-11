import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecuperacionFichaCriminogenaFacade } from '../../../../application/administracion/facades/recuperacion-ficha-criminogena.facade';
import { FichaCriminogenaRadioEntity } from '../../../../domain/administracion/entities/recuperacion-ficha-criminogena.entity';

@Component({
    selector: 'app-ficha-criminogena',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './recuperacion-ficha-criminogena.component.html',
    styleUrls: ['./recuperacion-ficha-criminogena.component.scss'],
})
export class RecuperacionFichaCriminogenaComponent {
    private readonly facade = inject(RecuperacionFichaCriminogenaFacade);

    get form() {
        return this.facade.form();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaHoraRegistro(): string {
        return this.form.fechaHoraRegistro;
    }

    get fichaRadio(): FichaCriminogenaRadioEntity | null {
        return this.form.fichaRadio;
    }
    set fichaRadio(value: FichaCriminogenaRadioEntity | null) {
        this.facade.updateField('fichaRadio', value);
    }

    get nombreBanda(): string {
        return this.form.nombreBanda;
    }
    set nombreBanda(value: string) {
        this.facade.updateField('nombreBanda', value);
    }

    get modalidadDelictiva(): string {
        return this.form.modalidadDelictiva;
    }
    set modalidadDelictiva(value: string) {
        this.facade.updateField('modalidadDelictiva', value);
    }

    get medioComision(): string {
        return this.form.medioComision;
    }
    set medioComision(value: string) {
        this.facade.updateField('medioComision', value);
    }

    get integrantes() {
        return this.form.integrantes;
    }

    get formIntegrante() {
        return this.form.formIntegrante;
    }

    setFichaRadio(value: FichaCriminogenaRadioEntity): void {
        this.facade.setFichaRadio(value);
    }

    updateIntegranteField(field: string, value: string): void {
        this.facade.updateIntegranteField(field, value);
    }

    onDeleteIntegrante(index: number): void {
        this.facade.onDeleteIntegrante(index);
    }

    onAgregarIntegrante(): void {
        this.facade.onAgregarIntegrante();
    }

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}