import { Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal-guardado-exitoso',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal-guardado-exitoso.component.html',
    styleUrls: ['./modal-guardado-exitoso.component.scss'],
})
export class ModalGuardadoExitosoComponent {
    @Input() folio = '';
    @Input() title = '¡Alta de predenuncia exitosa!';
    @Input() subtitle = 'La información se ha registrado correctamente';

    @Output() close = new EventEmitter<void>();
    @Output() print = new EventEmitter<void>();
    @Output() email = new EventEmitter<void>();

    private readonly location = inject(Location);
    private readonly router = inject(Router);

    constructor() {
        const nav = this.router.getCurrentNavigation();
        const state = nav?.extras?.state ?? history.state;

        if (state?.folio) {
            this.folio = state.folio;
        }

        if (state?.mensaje) {
            this.subtitle = state.mensaje;
        }
    }

    onClose(): void {
        this.close.emit();
        this.location.back();
    }

    onPrint(): void {
        this.print.emit();
        window.print();
    }

    onEmail(): void {
        this.email.emit();
        console.log('Enviar por correo');
    }

    @HostListener('document:keydown.escape')
    onEsc(): void {
        this.onClose();
    }
}