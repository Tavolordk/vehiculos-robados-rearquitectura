import { Injectable, signal } from '@angular/core';
import { DenunciaModusOperandiFormEntity } from '../../../domain/denuncia/entities/denuncia-modus-operandi.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaModusOperandiState {
    private readonly _form = signal<DenunciaModusOperandiFormEntity>({
        folio: '626317',
        fechaRegistro: '25/08/2025 11:32 a.m.',

        modalidad: 'sin',
        victimas: '',
        presuntos: '',

        tipoLugar: 'Seleccionar',
        seHizoPasarPor: 'Seleccionar',
        vestimenta: '',

        peculiaridades: '',
        senasParticulares: '',
        comportamiento: '',

        armas: {
            armaBlanca: false,
            armaFuego: false,
            fabricacionRudimentaria: false,
        },

        delitos: {
            contraSalud: false,
            homicidio: false,
            lesiones: false,
            secuestro: false,
            violacion: false,
        },

        marca: 'Seleccionar',
        submarca: 'Seleccionar',
        color: 'Seleccionar',
        placa: '',
        observaciones: '',
        maxObs: 500,

        asociados: [
            { marca: 'Nissan', submarca: 'Tsuru', color: 'Azul', placa: '-----' },
            { marca: 'Chevrolet', submarca: 'Captiva', color: 'Rojo', placa: '-----' },
            { marca: 'KIA', submarca: 'Tucson', color: 'Gris', placa: '-----' },
        ],
    });

    readonly form = this._form.asReadonly();

    updateForm(patch: Partial<DenunciaModusOperandiFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    updateArmas(patch: Partial<DenunciaModusOperandiFormEntity['armas']>): void {
        this._form.update((current) => ({
            ...current,
            armas: {
                ...current.armas,
                ...patch,
            },
        }));
    }

    updateDelitos(patch: Partial<DenunciaModusOperandiFormEntity['delitos']>): void {
        this._form.update((current) => ({
            ...current,
            delitos: {
                ...current.delitos,
                ...patch,
            },
        }));
    }

    setAsociados(asociados: DenunciaModusOperandiFormEntity['asociados']): void {
        this._form.update((current) => ({
            ...current,
            asociados,
        }));
    }
}
