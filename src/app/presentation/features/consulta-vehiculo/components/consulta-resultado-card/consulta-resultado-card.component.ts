import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    Output,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ConsultaResultadoEntity } from '../../../../../domain/consulta-vehiculo/entities/consulta-resultado.entity';

@Component({
    selector: 'app-consulta-resultado-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './consulta-resultado-card.component.html',
    styleUrls: ['./consulta-resultado-card.component.scss'],
})
export class ConsultaResultadoModalComponent implements AfterViewInit {
    @Input() modalId = 'consultaModal';
    @Input() title = 'Resultado de la consulta';
    @Input({ required: true }) data!: ConsultaResultadoEntity;

    @Output() imprimir = new EventEmitter<void>();
    @Output() closed = new EventEmitter<void>();

    @ViewChild('modalRoot', { static: true }) modalRoot!: ElementRef<HTMLElement>;

    private isBrowser = false;
    private instance: any = null;
    private ModalCtor: any = null;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    async ngAfterViewInit(): Promise<void> {
        if (!this.isBrowser) return;

        const mod: any = await import('bootstrap/js/dist/modal');
        this.ModalCtor = mod?.default ?? mod;

        this.instance = new this.ModalCtor(this.modalRoot.nativeElement, {
            backdrop: 'static',
            keyboard: false,
        });

        this.modalRoot.nativeElement.addEventListener('hidden.bs.modal', () => {
            this.closed.emit();
        });

        this.open();
    }

    open(): void {
        if (!this.isBrowser) return;
        this.instance?.show();
    }

    close(): void {
        if (!this.isBrowser) return;
        this.instance?.hide();
    }

    onImprimir(): void {
        this.imprimir.emit();
    }

    upper(v: any): string {
        return (v ?? '').toString().toUpperCase();
    }
}