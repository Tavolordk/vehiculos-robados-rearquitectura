import { Injectable, inject } from '@angular/core';
import { PredenunciaDenuncianteState } from '../state/predenuncia-denunciante.state';
import { TipoPersonaEntity } from '../../../domain/predenuncia/entities/predenuncia-denunciante.entity';

@Injectable({ providedIn: 'root' })
export class PredenunciaDenuncianteFacade {
    private readonly state = inject(PredenunciaDenuncianteState);

    readonly form = this.state.form;

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value });
    }

    setTipoPersona(tipo: TipoPersonaEntity): void {
        this.state.setTipoPersona(tipo);
    }

    onNext(): void {
        console.log('Siguiente - denunciante', this.state.form());
    }
}