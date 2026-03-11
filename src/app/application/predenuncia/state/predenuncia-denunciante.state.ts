import { Injectable, signal } from '@angular/core';
import {
    PredenunciaDenuncianteFormEntity,
    TipoPersonaEntity,
} from '../../../domain/predenuncia/entities/predenuncia-denunciante.entity';

@Injectable({ providedIn: 'root' })
export class PredenunciaDenuncianteState {
    private readonly _form = signal<PredenunciaDenuncianteFormEntity>({
        folio: '626317',
        fechaRegistro: '25/08/2025 11:32 a.m.',
        tipoPersona: 'fisica',
        nombreRazonSocial: '',
        primerApellido: '',
        segundoApellido: '',
        curp: '',
        rfc: '',
        sexo: '',
        telefono: '',
        correo: '',
    });

    readonly form = this._form.asReadonly();

    updateForm(patch: Partial<PredenunciaDenuncianteFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    setTipoPersona(tipo: TipoPersonaEntity): void {
        this._form.update((current) => ({
            ...current,
            tipoPersona: tipo,
            primerApellido: tipo === 'moral' ? '' : current.primerApellido,
            segundoApellido: tipo === 'moral' ? '' : current.segundoApellido,
            curp: tipo === 'moral' ? '' : current.curp,
            sexo: tipo === 'moral' ? '' : current.sexo,
        }));
    }
}