import { Injectable, inject } from '@angular/core';
import { PredenunciaDenuncianteState } from '../state/predenuncia-denunciante.state';
import { TipoPersonaEntity } from '../../../domain/predenuncia/entities/predenuncia-denunciante.entity';
import { CatalogosFacade } from '../../catalogos/facades/catalogos.facade';
import { Router } from '@angular/router';
import { SidebarProgressState } from '../../../shared/state/sidebar-progress.state';
import { PredenunciaDenuncianteField, PredenunciaDenuncianteValidator } from '../validators/predenuncia-denunciante.validator';
import { Normalizers } from '../../../shared/validation/normalizers';

@Injectable({ providedIn: 'root' })
export class PredenunciaDenuncianteFacade {
    private readonly state = inject(PredenunciaDenuncianteState);
    private readonly catalogosFacade = inject(CatalogosFacade);
    private readonly router = inject(Router);
    private readonly sidebarProgress = inject(SidebarProgressState);
    readonly form = this.state.form;
    readonly tiposPersona = this.state.tiposPersona;
    readonly sexos = this.state.sexos;
    readonly errors = this.state.errors;
    readonly submitted = this.state.submitted;

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
        const normalizedValue = this.normalizeFieldValue(field, value);
        this.state.updateForm({ [field]: normalizedValue });
        this.validate();
    }

    setTipoPersona(tipo: TipoPersonaEntity): void {
        this.state.setTipoPersona(tipo);
        this.validate();
    }

    validate(): boolean {
        const result = PredenunciaDenuncianteValidator.validate(this.state.form());
        this.state.setErrors(result.errors);
        return result.valid;
    }

    getError(field: PredenunciaDenuncianteField): string {
        return this.errors()[field] ?? '';
    }

    hasError(field: PredenunciaDenuncianteField): boolean {
        return !!this.getError(field);
    }

    onNext(): void {
        this.state.setSubmitted(true);

        if (!this.validate()) {
            return;
        }

        this.sidebarProgress.markStepCompleted('predenuncia.denunciante');
        this.router.navigateByUrl('/predenuncia/verificacion');
    }

    private normalizeFieldValue(field: string, value: string): string {
        switch (field) {
            case 'nombreRazonSocial':
            case 'primerApellido':
            case 'segundoApellido':
                return Normalizers.upperCollapse(value);
            case 'curp':
            case 'rfc':
                return Normalizers.upper(value);
            case 'telefono':
                return Normalizers.numeric(value).slice(0, 10);
            case 'correo':
                return Normalizers.email(value);
            default:
                return value;
        }
    }
}
