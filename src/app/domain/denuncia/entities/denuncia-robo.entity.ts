export type LocationTypeEntity = 'urbana' | 'coordenadas' | 'tramo';

export interface AveriguacionPreviaEntity {
    numero: string;
    confirmacion: string;
    fechaDenuncia: string;
    horaDenuncia: string;
    agenciaMP: string;
    agenteMP: string;
}

export interface UbicacionUrbanaEntity {
    colonia: string;
    calle: string;
    numExterior: string;
    numInterior: string;
    cp: string;
    referencia: string;
}

export interface UbicacionCoordenadasEntity {
    latitud: string;
    longitud: string;
}

export interface UbicacionTramoEntity {
    tramo: string;
    kilometro: string;
}

export interface DenunciaRoboPayloadEntity {
    folio: string;
    fechaRegistro: string;
    averiguacionPrevia: AveriguacionPreviaEntity;
    denuncia: {
        fechaRobo: string;
        horaRobo: string;
        entidad: string;
        municipio: string;
        ubicacion: {
            tipo: LocationTypeEntity;
            urbana: UbicacionUrbanaEntity;
            coordenadas: UbicacionCoordenadasEntity;
            tramo: UbicacionTramoEntity;
        };
    };
}

export interface DenunciaRoboFormEntity {
    folio: string;
    fechaRegistro: string;

    averPrev: string;
    averPrevConfirm: string;
    fechaDenuncia: string;
    horaDenuncia: string;
    agenciaMP: string;
    agenteMP: string;

    fechaRobo: string;
    horaRobo: string;

    entidades: string[];
    municipios: string[];
    colonias: string[];

    entidad: string;
    municipio: string;
    colonia: string;

    calle: string;
    numExterior: string;
    numInterior: string;
    cp: string;
    referencia: string;

    latitud: string;
    longitud: string;

    tramo: string;
    kilometro: string;

    locationType: LocationTypeEntity;
}