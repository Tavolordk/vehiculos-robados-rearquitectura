import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RecuperacionVerificacionFacade } from '../../../../application/administracion/facades/recuperacion-verificacion.facade';
import { ModalAltaRecuperacionComponent } from '../../../shared/modal-alta-recuperacion/modal-alta-recuperacion.component';

@Component({
    selector: 'app-verificacion-datos',
    standalone: true,
    imports: [CommonModule, ModalAltaRecuperacionComponent],
    templateUrl: './recuperacion-verificacion.component.html',
    styleUrls: ['./recuperacion-verificacion.component.scss'],
})
export class RecuperacionVerificacionComponent {
    private readonly facade = inject(RecuperacionVerificacionFacade);

    get data() {
        return this.facade.data();
    }

    get folio(): string {
        return this.data.folio;
    }

    get fechaHoraRegistro(): string {
        return this.data.fechaHoraRegistro;
    }

    get recuperacion() {
        return this.data.recuperacion;
    }

    get ficha() {
        return this.data.ficha;
    }

    get integrantes() {
        return this.data.integrantes;
    }

    get vehiculo() {
        return this.data.vehiculo;
    }

    get modalData() {
        return this.data.modalData;
    }

    get showSuccessModal(): boolean {
        return this.facade.showSuccessModal();
    }

    onEdit(seccion: 'recuperacion' | 'ficha' | 'vehiculo'): void {
        this.facade.onEdit(seccion);
    }

    onDeleteIntegrante(index: number): void {
        this.facade.onDeleteIntegrante(index);
    }

    onGuardar(): void {
        this.facade.onGuardar();
    }

    onCloseSuccessModal(): void {
        this.facade.onCloseModal();
    }
}