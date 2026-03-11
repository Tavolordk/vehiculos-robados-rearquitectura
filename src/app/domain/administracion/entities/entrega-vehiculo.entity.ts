export interface EntregaVehiculoInfoBaseEntity {
    carpeta: string;
    folioDenuncia: string;
    fechaDenuncia: string;
    horaDenuncia: string;
    fechaRobo: string;
    horaRobo: string;
    fechaRecuperacion: string;
    horaRecuperacion: string;
    serie: string;
    placa: string;
}

export interface EntregaVehiculoFormEntity {
    fechaEntrega: string;
    horaEntrega: string;
    calleNumero: string;
    referencia: string;
    colonia: string;
    entidad: string;
    municipio: string;
    cp: string;
}

export interface EntregaVehiculoCatalogosEntity {
    colonias: string[];
    entidades: string[];
    municipios: string[];
}

export interface EntregaVehiculoPageEntity {
    folio: string;
    fechaHoraRegistro: string;
    info: EntregaVehiculoInfoBaseEntity;
    entrega: EntregaVehiculoFormEntity;
    catalogos: EntregaVehiculoCatalogosEntity;
}