import { Injectable, inject } from '@angular/core';
import { DenunciaDenuncianteState } from '../state/denuncia-denunciante.state';
import { DenunciaDenunciantePayloadEntity, TipoPersonaDenunciaEntity } from '../../../domain/denuncia/entities/denuncia-denunciante.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaDenuncianteFacade {
    private readonly state = inject(DenunciaDenuncianteState);

    readonly form = this.state.form;

    updateField(field: string, value: string | boolean): void {
        this.state.updateForm({ [field]: value } as never);
    }

    setTipoPersona(tipo: TipoPersonaDenunciaEntity): void {
        this.state.updateForm({ tipoPersona: tipo });
    }

    onSiguiente(): void {
        console.log('Siguiente:', this.getPayload());
    }

    getPayload(): DenunciaDenunciantePayloadEntity {
        const form = this.state.form();

        return {
            folio: form.folio,
            fechaRegistro: form.fechaRegistro,
            identificacion: {
                tipoPersona: form.tipoPersona,
                nombreRazon: form.nombreRazon,
                primerApellido: form.primerApellido,
                segundoApellido: form.segundoApellido,
                curp: form.curp,
                rfc: form.rfc,
                sexo: form.sexo,
                telefono: form.telefono,
                correo: form.correo,
            },
            domicilio: {
                mismoDomicilioRobo: form.mismoDomicilioRobo,
                entidad: form.entidad,
                municipio: form.municipio,
                colonia: form.colonia,
                calle: form.calle,
                numExterior: form.numExterior,
                numInterior: form.numInterior,
                cp: form.cp,
            },
        };
    }
}