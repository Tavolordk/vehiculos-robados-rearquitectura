import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import {
    DetalleConsultaEntity,
    TipoDetalleEntity,
} from '../../../../../domain/consulta-vehiculo/entities/detalle-consulta.entity';

@Component({
    selector: 'app-detalle-consulta-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './detalle-consulta-modal.component.html',
    styleUrls: ['./detalle-consulta-modal.component.scss'],
})
export class DetalleConsultaModalComponent {
    @Input() open = false;
    @Input() data: DetalleConsultaEntity | null = null;
    @Input() tipo: TipoDetalleEntity = 'predenuncia';
    @Input() headerOffsetPx = 120;

    @Output() closed = new EventEmitter<void>();

    get headerTitle(): string {
        return this.tipo === 'predenuncia' ? 'Detalle (Predenuncia)' : 'Detalle (Denuncia)';
    }

    close(): void {
        this.closed.emit();
    }

    @HostListener('document:keydown.escape')
    onEsc(): void {
        if (this.open) this.close();
    }
}