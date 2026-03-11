import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenunciaVerificacionFacade } from '../../../../application/denuncia/facades/denuncia-verificacion.facade';
import { ModalAltaDenunciaExitosaComponent, ModalAltaDenunciaExitosaData } from '../../../shared/modal-alta-denuncia-exitosa/modal-alta-denuncia-exitosa.component';

@Component({
    selector: 'app-denuncia-verificacion',
    standalone: true,
    imports: [CommonModule, ModalAltaDenunciaExitosaComponent],
    templateUrl: './denuncia-verificacion.component.html',
    styleUrls: ['./denuncia-verificacion.component.scss'],
})
export class DenunciaVerificacionComponent {
    private readonly facade = inject(DenunciaVerificacionFacade);

    get data() {
        return this.facade.data();
    }

    get folio(): string {
        return this.data.folio;
    }

    get fechaRegistro(): string {
        return this.data.fechaRegistro;
    }

    get infoRobo() {
        return this.data.infoRobo;
    }

    get modus() {
        return this.data.modus;
    }

    get vehiculosAsociados() {
        return this.data.vehiculosAsociados;
    }

    get denunciante() {
        return this.data.denunciante;
    }

    get averiguacion() {
        return this.data.averiguacion;
    }

    get vehiculos() {
        return this.data.vehiculos;
    }

    get modalOkOpen(): boolean {
        return this.facade.modalOpen();
    }

    get modalOkData(): ModalAltaDenunciaExitosaData {
        return this.facade.modalData();
    }

    onEditar(seccion: 'robo' | 'modus' | 'denunciante' | 'averiguacion' | 'vehiculos'): void {
        this.facade.onEditar(seccion);
    }

    onGuardar(): void {
        this.facade.onGuardar();
    }

    onModalOkClose(): void {
        this.facade.onModalOkClose();
    }

    onModalOkImprimir(): void {
        this.facade.onModalOkImprimir();
    }

    onModalOkEnviarCorreo(): void {
        this.facade.onModalOkEnviarCorreo();
    }
}
