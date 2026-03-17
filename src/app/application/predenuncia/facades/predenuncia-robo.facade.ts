import { Injectable, inject } from '@angular/core';
import { PredenunciaRoboState } from '../state/predenuncia-robo.state';
import { LugarTipoEntity } from '../../../domain/predenuncia/entities/predenuncia-robo.entity';
import { CatalogosFacade } from '../../catalogos/facades/catalogos.facade';
import { Router } from '@angular/router';
import { SidebarProgressState } from '../../../shared/state/sidebar-progress.state';
import { PredenunciaRoboField, PredenunciaRoboValidator } from '../validators/predenuncia-robo.validator';
import { Normalizers } from '../../../shared/validation/normalizers';

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
    readonly errors = this.state.errors;
    readonly submitted = this.state.submitted;

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
        const normalizedValue = this.normalizeFieldValue(field, value);
        this.state.updateForm({ [field]: normalizedValue });

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
                municipio: normalizedValue,
                colonia: '',
            });

            this.state.setColonias([]);
        }

        this.validate();
    }

    setLugarTipo(tipo: LugarTipoEntity): void {
        this.state.setLugarTipo(tipo);
        this.validate();
    }

    onMapa(): void {
        console.log('Abrir mapa / modal / integración GIS');
    }

    validate(): boolean {
        const result = PredenunciaRoboValidator.validate(this.state.form());
        this.state.setErrors(result.errors);
        return result.valid;
    }

    getError(field: PredenunciaRoboField): string {
        return this.errors()[field] ?? '';
    }

    hasError(field: PredenunciaRoboField): boolean {
        return !!this.getError(field);
    }

    onNext(): void {
        this.state.setSubmitted(true);

        if (!this.validate()) {
            return;
        }
        this.sidebarProgress.markStepCompleted('predenuncia.robo');
        this.router.navigateByUrl('/predenuncia/denunciante');
    }

    private normalizeFieldValue(field: string, value: string): string {
        switch (field) {
            case 'fechaRobo':
            case 'horaRobo':
                return String(value ?? '').trim();
            case 'cp':
                return Normalizers.numeric(value).slice(0, 5);
            case 'latitud':
            case 'longitud':
            case 'kilometro':
                return String(value ?? '').replace(/[^0-9.-]/g, '').trim();
            case 'calle':
            case 'referencia':
            case 'tramo':
            case 'descHechos':
            case 'numExt':
            case 'numInt':
                return Normalizers.upperCollapse(value);
            default:
                return String(value ?? '').trim();
        }
    }
}
