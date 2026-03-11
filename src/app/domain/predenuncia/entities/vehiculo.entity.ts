export interface AutoRowEntity {
    marca: string;
    submarca: string;
    anio: string;
    color: string;
    placa: string;
    selected?: boolean;
}

export interface PredenunciaVehiculoFormEntity {
    folio: string;
    fechaRegistro: string;
    serieVin: string;
    placa: string;
    procedenciaPlaca: string;
    nrpv: string;
    modelo: string;
    entidad: string;
    marca: string;
    submarca: string;
    permiso: string;
    color: string;
    senas: string;
}