import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ModalAltaRecuperacionEntity } from '../../../domain/shared/entities/modal-alta-recuperacion.entity';

export type ModalAltaRecuperacionData = ModalAltaRecuperacionEntity;

@Component({
    selector: 'app-modal-alta-recuperacion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal-alta-recuperacion.component.html',
    styleUrls: ['./modal-alta-recuperacion.component.scss'],
})
export class ModalAltaRecuperacionComponent {
    @Input({ required: true }) data!: ModalAltaRecuperacionData;

    @Output() closed = new EventEmitter<void>();

    ngOnInit(): void {
        console.log('[ModalAltaRecuperacion] mounted', this.data);
    }

    close(): void {
        this.closed.emit();
    }

    @HostListener('document:keydown.escape')
    onEsc(): void {
        this.close();
    }

    onBackdropClick(ev: MouseEvent): void {
        const target = ev.target as HTMLElement;
        if (target.classList.contains('modal-overlay')) {
            this.close();
        }
    }

    imprimir(): void {
        window.print();
    }
}