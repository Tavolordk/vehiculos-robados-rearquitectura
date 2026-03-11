import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InspeccionMinisterialFacade } from '../../../../application/administracion/facades/inspeccion-ministerial.facade';
import { SiNoEntity } from '../../../../domain/administracion/entities/inspeccion-ministerial.entity';

@Component({
    selector: 'app-inspeccion-ministerial',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './inspeccion-ministerial.component.html',
    styleUrls: ['./inspeccion-ministerial.component.scss'],
})
export class InspeccionMinisterialComponent {
    private readonly facade = inject(InspeccionMinisterialFacade);

    get data() {
        return this.facade.data();
    }

    get folio(): string {
        return this.data.folio;
    }

    get fechaHoraRegistro(): string {
        return this.data.fechaHoraRegistro;
    }

    get maxObs(): number {
        return this.data.maxObs;
    }

    get inspeccion(): SiNoEntity {
        return this.data.form.inspeccion;
    }
    set inspeccion(value: SiNoEntity) {
        this.facade.updateField('inspeccion', value);
    }

    get valorUnidad(): string {
        return this.data.form.valorUnidad;
    }
    set valorUnidad(value: string) {
        this.facade.updateField('valorUnidad', value);
    }

    get porcentajeRecuperacion(): string {
        return this.data.form.porcentajeRecuperacion;
    }
    set porcentajeRecuperacion(value: string) {
        this.facade.updateField('porcentajeRecuperacion', value);
    }

    get serieNivAlterada(): string {
        return this.data.form.serieNivAlterada;
    }
    set serieNivAlterada(value: string) {
        this.facade.updateField('serieNivAlterada', value);
    }

    get motorAlterado(): string {
        return this.data.form.motorAlterado;
    }
    set motorAlterado(value: string) {
        this.facade.updateField('motorAlterado', value);
    }

    get observaciones(): string {
        return this.data.form.observaciones;
    }
    set observaciones(value: string) {
        this.facade.updateField('observaciones', value);
    }

    get remainingObs(): number {
        const len = (this.observaciones ?? '').length;
        return Math.max(this.maxObs - len, 0);
    }

    onVerificarNiv(): void {
        this.facade.onVerificarNiv();
    }

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}