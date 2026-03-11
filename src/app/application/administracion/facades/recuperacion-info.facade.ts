import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperacionInfoState } from '../state/recuperacion-info.state';
import { RecuperacionLocationTypeEntity } from '../../../domain/administracion/entities/recuperacion-info.entity';

@Injectable({ providedIn: 'root' })
export class RecuperacionInfoFacade {
    private readonly state = inject(RecuperacionInfoState);
    private readonly router = inject(Router);

    readonly form = this.state.form;

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value } as never);
    }

    setLocationType(type: RecuperacionLocationTypeEntity): void {
        this.state.setLocationType(type);
    }

    onMapa(): void {
        // placeholder
    }

    onNext(): void {
        this.router.navigateByUrl('/admin/recuperacion/vehiculo');
    }
}
