export interface RecuperacionVehiculoVmEntity {
    serieVin: string;
    motor: string;
    permiso: string;
    procedenciaPlaca: string;
    placa: string;
    modelo: string;
    tipoVehiculo: string;
    tipoUso: string;
    marca: string;
    submarca: string;
    color: string;
    senasParticulares: string;
}

export interface RecuperacionVehiculoFormEntity {
    folio: string;
    fechaHoraRegistro: string;
    vehiculo: RecuperacionVehiculoVmEntity;
}