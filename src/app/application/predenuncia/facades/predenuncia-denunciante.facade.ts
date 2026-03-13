import { Injectable, inject } from '@angular/core';
import { PredenunciaDenuncianteState } from '../state/predenuncia-denunciante.state';
import { TipoPersonaEntity } from '../../../domain/predenuncia/entities/predenuncia-denunciante.entity';
import { CatalogosFacade } from '../../catalogos/facades/catalogos.facade';
import { Router } from '@angular/router';
import { SidebarProgressState } from '../../../shared/state/sidebar-progress.state';
@Injectable({ providedIn: 'root' })
export class PredenunciaDenuncianteFacade {
    private readonly state = inject(PredenunciaDenuncianteState);
    private readonly catalogosFacade = inject(CatalogosFacade);
    private readonly router = inject(Router);
    private readonly sidebarProgress = inject(SidebarProgressState);
    readonly form = this.state.form;
    readonly tiposPersona = this.state.tiposPersona;
    readonly sexos = this.state.sexos;

    constructor() {
        this.cargarCatalogos();
    }

    private cargarCatalogos(): void {
        this.catalogosFacade.getTiposPersona().subscribe({
            next: (items) => this.state.setTiposPersona(items),
            error: (error) => console.error('Error al cargar tipos de persona', error),
        });

        this.catalogosFacade.getSexos().subscribe({
            next: (items) => this.state.setSexos(items),
            error: (error) => console.error('Error al cargar sexos', error),
        });
    }

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value });
    }

    setTipoPersona(tipo: TipoPersonaEntity): void {
        this.state.setTipoPersona(tipo);
    }

    onNext(): void {
        const form = this.state.form();

        const esValido =
            !!form.nombreRazonSocial &&
            !!form.rfc &&
            (form.tipoPersona === 'moral' || !!form.sexo);

        if (!esValido) {
            alert('Completa los campos requeridos');
            return;
        }

        this.sidebarProgress.markStepCompleted('predenuncia.denunciante');
        this.router.navigateByUrl('/predenuncia/verificacion');
    }
}