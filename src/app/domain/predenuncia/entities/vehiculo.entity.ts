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

export interface AutoRowEntity {
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

    marcaDescripcion: string;
    submarcaDescripcion: string;
    colorDescripcion: string;

    anio: string;
    selected: boolean;
}