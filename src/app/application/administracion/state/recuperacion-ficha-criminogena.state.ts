import { Injectable, signal } from '@angular/core';
import { RecuperacionFichaCriminogenaFormEntity } from '../../../domain/administracion/entities/recuperacion-ficha-criminogena.entity';

@Injectable({ providedIn: 'root' })
export class RecuperacionFichaCriminogenaState {
    private readonly _form = signal<RecuperacionFichaCriminogenaFormEntity>({
        folio: '626317',
        fechaHoraRegistro: '25/08/2025 11:32 a.m.',
        fichaRadio: null,
        nombreBanda: '',
        modalidadDelictiva: '',
        medioComision: '',
        integrantes: [
            { noIntegrante: 1, alias: '...', nombre: '...', primerApellido: '...' },
        ],
        formIntegrante: {
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            alias: '',
            fechaNacimiento: '',
            lugarOrigen: '',
            complexion: '',
            colorPiel: '',
            estatura: '',
            cabelloCantidad: '',
            cabelloForma: '',
            cabelloColor: '',
            cejasDireccion: '',
            cejasForma: '',
            cejasTamano: '',
            ojosColor: '',
            ojosForma: '',
            ojosTamano: '',
            ocupacion: '',
            modalidad: '',
            senasParticulares: '',
            observaciones: '',
            calleNumero: '',
            referencia: '',
            colonia: '',
            entidad: '',
            municipio: '',
            cp: '',
        },
    });

    readonly form = this._form.asReadonly();

    updateForm(patch: Partial<RecuperacionFichaCriminogenaFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    updateIntegranteForm(patch: Partial<RecuperacionFichaCriminogenaFormEntity['formIntegrante']>): void {
        this._form.update((current) => ({
            ...current,
            formIntegrante: {
                ...current.formIntegrante,
                ...patch,
            },
        }));
    }

    setIntegrantes(integrantes: RecuperacionFichaCriminogenaFormEntity['integrantes']): void {
        this._form.update((current) => ({
            ...current,
            integrantes,
        }));
    }

    resetIntegranteBasico(): void {
        this._form.update((current) => ({
            ...current,
            formIntegrante: {
                ...current.formIntegrante,
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                alias: '',
            },
        }));
    }
}