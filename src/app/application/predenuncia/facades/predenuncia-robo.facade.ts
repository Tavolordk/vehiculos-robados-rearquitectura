import { Injectable, inject } from '@angular/core';
import { PredenunciaRoboState } from '../state/predenuncia-robo.state';
import { LugarTipoEntity } from '../../../domain/predenuncia/entities/predenuncia-robo.entity';

@Injectable({ providedIn: 'root' })
export class PredenunciaRoboFacade {
    private readonly state = inject(PredenunciaRoboState);

    readonly form = this.state.form;
    readonly modalidades = this.state.modalidades;
    readonly entidades = this.state.entidades;
    readonly municipios = this.state.municipios;
    readonly colonias = this.state.colonias;

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value });
    }

    setLugarTipo(tipo: LugarTipoEntity): void {
        this.state.setLugarTipo(tipo);
    }

    onMapa(): void {
        console.log('Abrir mapa / modal / integración GIS');
    }

    onNext(): void {
        console.log('Siguiente', this.state.form());
    }
}