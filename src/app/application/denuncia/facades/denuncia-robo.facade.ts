import { Injectable, inject } from '@angular/core';
import { DenunciaRoboState } from '../state/denuncia-robo.state';
import { DenunciaRoboPayloadEntity, LocationTypeEntity } from '../../../domain/denuncia/entities/denuncia-robo.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaRoboFacade {
    private readonly state = inject(DenunciaRoboState);

    readonly form = this.state.form;

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value } as never);
    }

    setLocationType(type: LocationTypeEntity): void {
        this.state.setLocationType(type);
    }

    onMapa(): void {
        const form = this.state.form();

        console.log('Mapa:', {
            locationType: form.locationType,
            urbana: {
                colonia: form.colonia,
                calle: form.calle,
                numExterior: form.numExterior,
                numInterior: form.numInterior,
                cp: form.cp,
            },
            coords: {
                latitud: form.latitud,
                longitud: form.longitud,
            },
            tramo: {
                tramo: form.tramo,
                kilometro: form.kilometro,
            },
        });
    }

    onSiguiente(): void {
        console.log('Siguiente:', this.getPayload());
    }

    getPayload(): DenunciaRoboPayloadEntity {
        const form = this.state.form();

        return {
            folio: form.folio,
            fechaRegistro: form.fechaRegistro,
            averiguacionPrevia: {
                numero: form.averPrev,
                confirmacion: form.averPrevConfirm,
                fechaDenuncia: form.fechaDenuncia,
                horaDenuncia: form.horaDenuncia,
                agenciaMP: form.agenciaMP,
                agenteMP: form.agenteMP,
            },
            denuncia: {
                fechaRobo: form.fechaRobo,
                horaRobo: form.horaRobo,
                entidad: form.entidad,
                municipio: form.municipio,
                ubicacion: {
                    tipo: form.locationType,
                    urbana: {
                        colonia: form.colonia,
                        calle: form.calle,
                        numExterior: form.numExterior,
                        numInterior: form.numInterior,
                        cp: form.cp,
                        referencia: form.referencia,
                    },
                    coordenadas: {
                        latitud: form.latitud,
                        longitud: form.longitud,
                    },
                    tramo: {
                        tramo: form.tramo,
                        kilometro: form.kilometro,
                    },
                },
            },
        };
    }
}