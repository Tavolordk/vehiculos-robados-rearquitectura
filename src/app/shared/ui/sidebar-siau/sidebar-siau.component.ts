import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type SectionKey = 'consulta' | 'registro' | 'admin';

export type SidebarStepKey =
    | 'predenuncia.vehiculo'
    | 'predenuncia.robo'
    | 'predenuncia.denunciante'
    | 'predenuncia.verificacion'
    | 'denuncia.vehiculo'
    | 'denuncia.robo'
    | 'denuncia.denunciante'
    | 'denuncia.modus'
    | 'denuncia.verificacion'
    | 'recuperacion.info'
    | 'recuperacion.vehiculo'
    | 'recuperacion.ficha'
    | 'recuperacion.verificacion'
    | 'entrega.vehiculo'
    | 'entrega.inspeccion'
    | 'entrega.documentacion'
    | 'entrega.verificacion';

@Component({
    selector: 'app-sidebar-siau',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar-siau.component.html',
    styleUrls: ['./sidebar-siau.component.scss'],
})
export class SidebarSiauComponent {
    @Input() open = true;
    @Output() openChange = new EventEmitter<boolean>();
    @Input() completedSteps: Partial<Record<SidebarStepKey, boolean>> = {};

    sections: Record<SectionKey, boolean> = {
        consulta: true,
        registro: true,
        admin: true,
    };

    predenunciaOpen = true;
    denunciaOpen = true;
    recuperacionOpen = true;
    entregaOpen = false;

    isStepDone(key: SidebarStepKey): boolean {
        return !!this.completedSteps?.[key];
    }

    toggleSidebar(): void {
        this.open = !this.open;
        this.openChange.emit(this.open);
    }

    toggleSection(key: SectionKey): void {
        this.sections[key] = !this.sections[key];
    }

    togglePredenuncia(): void {
        this.predenunciaOpen = !this.predenunciaOpen;
    }

    toggleDenuncia(): void {
        this.denunciaOpen = !this.denunciaOpen;
    }

    toggleRecuperacion(): void {
        this.recuperacionOpen = !this.recuperacionOpen;
    }

    toggleEntrega(): void {
        this.entregaOpen = !this.entregaOpen;
    }

    closeOnNavigate(): void {
        this.open = false;
        this.openChange.emit(this.open);
    }
}