import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import {
    DetalleModalDataEntity,
    TipoDetalleEntity,
} from '../../../../../domain/consulta-general/entities/modal-detalle-consulta.entity';

@Component({
    selector: 'app-modal-detalle-consulta',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal-detalle-consulta.component.html',
    styleUrls: ['./modal-detalle-consulta.component.scss'],
})
export class ModalDetalleConsultaComponent {
    @Input() open = false;
    @Input() tipo: TipoDetalleEntity = 'denuncia';
    @Input() headerOffsetPx = 120;

    @Input() data: DetalleModalDataEntity = {
        infoRobo: {
            folio: '',
            fechaRobo: '',
            horaCaptura: '',
            entidad: '',
            municipio: '',
            colonia: '',
            calle: '',
            cp: '',
            referencia: '',
            tramo: '',
            kilometro: '',
            latitud: '',
            longitud: '',
        },
        denunciante: {
            tipoPersona: '',
            nombres: '',
            primerApellido: '',
            segundoApellido: '',
            sexo: '',
            telefono: '',
            rfc: '',
            correo: '',
        },
        modus: {
            modalidad: '',
            victimas: '',
            presuntos: '',
            tipoLugar: '',
            seHacePasarPor: '',
            peculiaridades: '',
            senas: '',
            vestimenta: '',
            comportamiento: '',
            armas: '',
            delitos: '',
        },
        averiguacion: {
            numero: '',
            agencia: '',
            agente: '',
        },
        vehiculosAsociados: [],
        vehiculos: [],
    };

    @Output() closed = new EventEmitter<void>();
    @Output() editar = new EventEmitter<'robo' | 'denunciante' | 'modus' | 'averiguacion' | 'vehiculos'>();

    get headerTitle(): string {
        return this.tipo === 'predenuncia' ? 'Detalle (Predenuncia)' : 'Detalle (Denuncia)';
    }

    close(): void {
        this.closed.emit();
    }

    onEdit(seccion: 'robo' | 'denunciante' | 'modus' | 'averiguacion' | 'vehiculos'): void {
        this.editar.emit(seccion);
    }

    stop(e: MouseEvent): void {
        e.stopPropagation();
    }

    show(v: any): string {
        const s = (v ?? '').toString().trim();
        return s.length ? s : '—';
    }

    @HostListener('document:keydown.escape')
    onEsc(): void {
        if (this.open) this.close();
    }
}