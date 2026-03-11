import { Injectable, inject } from '@angular/core';
import { DenunciaVerificacionState } from '../state/denuncia-verificacion.state';

@Injectable({ providedIn: 'root' })
export class DenunciaVerificacionFacade {
    private readonly state = inject(DenunciaVerificacionState);

    readonly data = this.state.data;
    readonly modalOpen = this.state.modalOpen;
    readonly modalData = this.state.modalData;

    onEditar(seccion: 'robo' | 'modus' | 'denunciante' | 'averiguacion' | 'vehiculos'): void {
        console.log('Editar sección:', seccion);
    }

    onGuardar(): void {
        const data = this.state.data();

        console.log('Guardar verificación', data);

        this.state.setModalData({
            averiguacionPrevia: data.averiguacion.numero,
            folio: data.folio,
            placa: data.vehiculos?.[0]?.placaPermiso ?? '',
            serieNiv: data.vehiculos?.[0]?.serieVin ?? '',
        });

        this.state.setModalOpen(true);
    }

    onModalOkClose(): void {
        this.state.setModalOpen(false);
    }

    onModalOkImprimir(): void {
        console.log('Imprimir comprobante (pendiente)');
    }

    onModalOkEnviarCorreo(): void {
        console.log('Enviar por correo (pendiente)');
    }
}
