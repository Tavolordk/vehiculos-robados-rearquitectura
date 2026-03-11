import { Injectable, inject } from '@angular/core';
import { DenunciaModusOperandiState } from '../state/denuncia-modus-operandi.state';
import {
    DenunciaModusOperandiPayloadEntity,
    ModalidadRoboEntity,
    VehiculoAsociadoEntity,
} from '../../../domain/denuncia/entities/denuncia-modus-operandi.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaModusOperandiFacade {
    private readonly state = inject(DenunciaModusOperandiState);

    readonly form = this.state.form;

    updateField(field: string, value: string | number): void {
        this.state.updateForm({ [field]: value } as never);
    }

    setModalidad(value: ModalidadRoboEntity): void {
        this.state.updateForm({ modalidad: value });
    }

    updateArma(field: string, value: boolean): void {
        this.state.updateArmas({ [field]: value } as never);
    }

    updateDelito(field: string, value: boolean): void {
        this.state.updateDelitos({ [field]: value } as never);
    }

    onAgregarAuto(): void {
        const form = this.state.form();

        const nuevo: VehiculoAsociadoEntity = {
            marca: form.marca === 'Seleccionar' ? '' : form.marca,
            submarca: form.submarca === 'Seleccionar' ? '' : form.submarca,
            color: form.color === 'Seleccionar' ? '' : form.color,
            placa: (form.placa || '').trim() || '-----',
        };

        if (!nuevo.marca && !nuevo.submarca && !nuevo.color && nuevo.placa === '-----') return;

        this.state.setAsociados([...form.asociados, nuevo]);

        this.state.updateForm({
            marca: 'Seleccionar',
            submarca: 'Seleccionar',
            color: 'Seleccionar',
            placa: '',
            observaciones: '',
        });
    }

    onEliminarAuto(index: number): void {
        const asociados = this.state.form().asociados.filter((_, i) => i !== index);
        this.state.setAsociados(asociados);
    }

    onSiguiente(): void {
        console.log('Siguiente:', this.getPayload());
    }

    getPayload(): DenunciaModusOperandiPayloadEntity {
        const form = this.state.form();

        return {
            folio: form.folio,
            fechaRegistro: form.fechaRegistro,
            modus: {
                modalidad: form.modalidad,
                victimas: form.victimas,
                presuntos: form.presuntos,
                tipoLugar: form.tipoLugar,
                seHizoPasarPor: form.seHizoPasarPor,
                vestimenta: form.vestimenta,
                peculiaridades: form.peculiaridades,
                senasParticulares: form.senasParticulares,
                comportamiento: form.comportamiento,
                armas: form.armas,
                delitos: form.delitos,
            },
            vehiculosAsociados: {
                observaciones: form.observaciones,
                items: form.asociados,
            },
        };
    }
}
