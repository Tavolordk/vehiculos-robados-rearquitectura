export interface DenunciaVehiculoRowEntity {
    marca: string;
    submarca: string;
    anioModelo: string;
    color: string;
    placa: string;
}

export interface DenunciaVehiculoFormEntity {
    folio: string;
    fechaHoraRegistro: string;

    serieVin: string;
    placa: string;
    procedenciaPlaca: string;
    nrpv: string;
    tipoVehiculo: string;
    modelo: string;
    entidad: string;
    tipoUso: string;
    marca: string;
    submarca: string;
    permiso: string;
    color: string;
    senasParticulares: string;
    noMotor: string;

    loadingBuscar: boolean;
}