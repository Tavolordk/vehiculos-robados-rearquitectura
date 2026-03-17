import { Injectable, signal } from '@angular/core';
import {
    PredenunciaDenuncianteFormEntity,
    TipoPersonaEntity,
} from '../../../domain/predenuncia/entities/predenuncia-denunciante.entity';
import { CatalogItemEntity } from '../../../domain/catalogos/entities/catalog-item.entity';
import { PredenunciaDenuncianteField } from '../validators/predenuncia-denunciante.validator';

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

    private readonly _tiposPersona = signal<CatalogItemEntity[]>([]);
    private readonly _sexos = signal<CatalogItemEntity[]>([]);
    private readonly _errors = signal<Partial<Record<PredenunciaDenuncianteField, string>>>({});
    private readonly _submitted = signal<boolean>(false);

    readonly form = this._form.asReadonly();
    readonly tiposPersona = this._tiposPersona.asReadonly();
    readonly sexos = this._sexos.asReadonly();
    readonly errors = this._errors.asReadonly();
    readonly submitted = this._submitted.asReadonly();

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

    setTiposPersona(items: CatalogItemEntity[]): void {
        this._tiposPersona.set(items);
    }

    setSexos(items: CatalogItemEntity[]): void {
        this._sexos.set(items);
    }

    setErrors(errors: Partial<Record<PredenunciaDenuncianteField, string>>): void {
        this._errors.set(errors);
    }

    setSubmitted(value: boolean): void {
        this._submitted.set(value);
    }
}
