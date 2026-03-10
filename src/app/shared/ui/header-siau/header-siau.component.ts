import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header-siau-simple',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header-siau.component.html',
    styleUrls: ['./header-siau.component.scss'],
})
export class HeaderSiauSimpleComponent {
    @Input() title = 'Vehículos Robados y Recuperados';
    @Input() userName = 'Invitado';
    @Input() userRole = '';
    @Input() logoSrc = 'assets/images/SSPC.png';
    @Input() logoAlt = 'Seguridad';
    @Input() bgSrc: string | null = 'assets/images/encabezado.png';
    @Input() height = 120;

    @Output() logout = new EventEmitter<void>();

    onLogout(): void {
        this.logout.emit();
    }
}