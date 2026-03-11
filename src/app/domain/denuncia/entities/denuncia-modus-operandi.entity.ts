export type ModalidadRoboEntity = 'sin' | 'con';

export interface ArmasEntity {
    armaBlanca: boolean;
    armaFuego: boolean;
    fabricacionRudimentaria: boolean;
}

export interface DelitosEntity {
    contraSalud: boolean;
    homicidio: boolean;
    lesiones: boolean;
    secuestro: boolean;
    violacion: boolean;
}

export interface VehiculoAsociadoEntity {
    marca: string;
    submarca: string;
    color: string;
    placa: string;
}

export interface DenunciaModusOperandiFormEntity {
    folio: string;
    fechaRegistro: string;

    modalidad: ModalidadRoboEntity;
    victimas: string;
    presuntos: string;

    tipoLugar: string;
    seHizoPasarPor: string;
    vestimenta: string;

    peculiaridades: string;
    senasParticulares: string;
    comportamiento: string;

    armas: ArmasEntity;
    delitos: DelitosEntity;

    marca: string;
    submarca: string;
    color: string;
    placa: string;
    observaciones: string;
    maxObs: number;

    asociados: VehiculoAsociadoEntity[];
}

export interface DenunciaModusOperandiPayloadEntity {
    folio: string;
    fechaRegistro: string;
    modus: {
        modalidad: ModalidadRoboEntity;
        victimas: string;
        presuntos: string;
        tipoLugar: string;
        seHizoPasarPor: string;
        vestimenta: string;
        peculiaridades: string;
        senasParticulares: string;
        comportamiento: string;
        armas: ArmasEntity;
        delitos: DelitosEntity;
    };
    vehiculosAsociados: {
        observaciones: string;
        items: VehiculoAsociadoEntity[];
    };
}
