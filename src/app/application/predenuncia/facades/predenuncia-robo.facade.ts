import { Injectable, inject } from '@angular/core';
import { PredenunciaRoboState } from '../state/predenuncia-robo.state';
import { LugarTipoEntity } from '../../../domain/predenuncia/entities/predenuncia-robo.entity';
import { CatalogosFacade } from '../../catalogos/facades/catalogos.facade';
import { Router } from '@angular/router';
import { SidebarProgressState } from '../../../shared/state/sidebar-progress.state';
@Injectable({ providedIn: 'root' })
export class PredenunciaRoboFacade {
    private readonly state = inject(PredenunciaRoboState);
    private readonly catalogosFacade = inject(CatalogosFacade);
    private readonly router = inject(Router);
    private readonly sidebarProgress = inject(SidebarProgressState);
    readonly form = this.state.form;
    readonly modalidades = this.state.modalidades;
    readonly entidades = this.state.entidades;
    readonly municipios = this.state.municipios;
    readonly colonias = this.state.colonias;

    constructor() {
        this.cargarCatalogosIniciales();
    }

    private cargarCatalogosIniciales(): void {
        this.catalogosFacade.getModalidadesRobo().subscribe({
            next: (items) => this.state.setModalidades(items),
            error: (error) => console.error('Error al cargar modalidades de robo', error),
        });

        this.catalogosFacade.getEntidades().subscribe({
            next: (items) => this.state.setEntidades(items),
            error: (error) => console.error('Error al cargar entidades', error),
        });
    }

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value });

        if (field === 'entidad') {
            this.state.updateForm({
                municipio: '',
                colonia: '',
            });

            this.state.setMunicipios([]);
            this.state.setColonias([]);
        }

        if (field === 'municipio') {
            this.state.updateForm({
                municipio: value,
                colonia: '',
            });

            this.state.setColonias([]);
        }
    }

    setLugarTipo(tipo: LugarTipoEntity): void {
        this.state.setLugarTipo(tipo);
    }

    onMapa(): void {
        console.log('Abrir mapa / modal / integración GIS');
    }

    onNext(): void {
        const form = this.state.form();

        const esValido =
            !!form.fechaRobo &&
            !!form.horaRobo &&
            !!form.modalidadRobo &&
            !!form.entidad;

        if (!esValido) {
            alert('Completa la información del robo');
            return;
        }
        this.sidebarProgress.markStepCompleted('predenuncia.robo');
        this.router.navigateByUrl('/predenuncia/denunciante');
    }
}