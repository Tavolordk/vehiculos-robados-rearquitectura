import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAltaDenunciaExitosaEntity } from '../../../domain/shared/entities/modal-alta-denuncia-exitosa.entity';

export type ModalAltaDenunciaExitosaData = ModalAltaDenunciaExitosaEntity;

@Component({
    selector: 'app-modal-alta-denuncia-exitosa',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal-alta-denuncia-exitosa.component.html',
    styleUrls: ['./modal-alta-denuncia-exitosa.component.scss'],
})
export class ModalAltaDenunciaExitosaComponent {
    @Input() open = false;

    @Input() data: ModalAltaDenunciaExitosaData = {
        averiguacionPrevia: '',
        folio: '',
        placa: '',
        serieNiv: '',
    };

    @Input() closeOnBackdrop = true;

    @Output() closed = new EventEmitter<void>();
    @Output() imprimir = new EventEmitter<void>();
    @Output() enviarCorreo = new EventEmitter<void>();

    onBackdropClick(): void {
        if (this.closeOnBackdrop) {
            this.closed.emit();
        }
    }

    onClose(): void {
        this.closed.emit();
    }

    onImprimir(): void {
        this.imprimir.emit();
    }

    onEnviarCorreo(): void {
        this.enviarCorreo.emit();
    }
}
