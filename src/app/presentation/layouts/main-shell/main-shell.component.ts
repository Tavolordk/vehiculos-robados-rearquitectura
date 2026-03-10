import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderSiauSimpleComponent } from '../../../shared/ui/header-siau/header-siau.component';
import { SidebarSiauComponent } from '../../../shared/ui/sidebar-siau/sidebar-siau.component';

@Component({
    selector: 'app-main-shell',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidebarSiauComponent, HeaderSiauSimpleComponent],
    templateUrl: './main-shell.component.html',
    styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent {
    userName = 'Luis Vargas';
    userRole = 'Capturista';

    sidebarOpen = true;

    completedSteps = {
        'predenuncia.vehiculo': true,
        'predenuncia.robo': false,
        'predenuncia.denunciante': false,
        'predenuncia.verificacion': false,
        'denuncia.vehiculo': false,
        'denuncia.robo': false,
        'denuncia.denunciante': false,
        'denuncia.modus': false,
        'denuncia.verificacion': false,
        'recuperacion.info': false,
        'recuperacion.vehiculo': false,
        'recuperacion.ficha': false,
        'recuperacion.verificacion': false,
        'entrega.vehiculo': false,
        'entrega.inspeccion': false,
        'entrega.documentacion': false,
        'entrega.verificacion': false,
    } as const;

    onLogout(): void {
        console.log('logout');
    }

    onSidebarOpenChange(open: boolean): void {
        this.sidebarOpen = open;
    }
}