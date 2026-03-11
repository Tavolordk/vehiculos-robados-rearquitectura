export interface RecuperacionResumenEntity {
    documento: string;
    fechaDocumento: string;
    horaDocumento: string;
    agenciaMp: string;
    fechaRecuperacion: string;
    agenteMp: string;
    horaRecuperacion: string;
}

export interface FichaCriminogenaResumenEntity {
    nombreBanda: string;
    modalidadDelictiva: string;
}

export interface IntegranteResumenEntity {
    noIntegrante: string;
    alias: string;
    nombre: string;
    primerApellido: string;
}

export interface VehiculoRecuperacionResumenEntity {
    vin: string;
    nrpv: string;
    entidad: string;
    submarca: string;
    motor: string;
    placa: string;
    tipoVehiculo: string;
    tipoUso: string;
    permiso: string;
    senas: string;
    procedenciaPlaca: string;
    modelo: string;
    marca: string;
    color: string;
}

export interface ModalAltaRecuperacionEntity {
    carpeta: string;
    estatus: string;
    folio: string;
    placa: string;
    vin: string;
}

export interface RecuperacionVerificacionEntity {
    folio: string;
    fechaHoraRegistro: string;
    recuperacion: RecuperacionResumenEntity;
    ficha: FichaCriminogenaResumenEntity;
    integrantes: IntegranteResumenEntity[];
    vehiculo: VehiculoRecuperacionResumenEntity;
    modalData: ModalAltaRecuperacionEntity;
}