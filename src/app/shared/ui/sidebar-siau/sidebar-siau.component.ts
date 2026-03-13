import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarProgressState, SidebarStepKey } from '../../../shared/state/sidebar-progress.state';

type SectionKey = 'consulta' | 'registro' | 'admin';

@Component({
    selector: 'app-sidebar-siau',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar-siau.component.html',
    styleUrls: ['./sidebar-siau.component.scss'],
})
export class SidebarSiauComponent {
    private readonly sidebarProgress = inject(SidebarProgressState);

    @Input() open = true;
    @Output() openChange = new EventEmitter<boolean>();

    sections: Record<SectionKey, boolean> = {
        consulta: true,
        registro: true,
        admin: true,
    };

    predenunciaOpen = true;
    denunciaOpen = true;
    recuperacionOpen = true;
    entregaOpen = false;

    get completedSteps(): Partial<Record<SidebarStepKey, boolean>> {
        return this.sidebarProgress.completedSteps();
    }

    isStepDone(key: SidebarStepKey): boolean {
        return !!this.completedSteps[key];
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