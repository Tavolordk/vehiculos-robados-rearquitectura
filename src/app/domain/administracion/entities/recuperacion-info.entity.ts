export type RecuperacionLocationTypeEntity = 'urbana' | 'coordenadas' | 'tramo';

export interface DenunciaResumenRecuperacionEntity {
    carpeta: string;
    folio: string;
    fechaDenuncia: string;
    horaDenuncia: string;
    fechaRobo: string;
    horaRobo: string;
    estatus: string;
}

export interface RecuperacionInfoFormEntity {
    denuncia: DenunciaResumenRecuperacionEntity;

    documentoRecuperacion: string;
    fechaDocumento: string;
    horaDocumento: string;
    agenciaMpDocumento: string;
    agenteMpDocumento: string;

    fechaRecuperacion: string;
    horaRecuperacion: string;
    entidad: string;
    municipio: string;
    colonia: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    cp: string;
    referencia: string;

    latitud: string;
    longitud: string;

    tramo: string;
    kilometro: string;

    locationType: RecuperacionLocationTypeEntity;

    documentosRecuperacion: string[];
    agenciasMp: string[];
    entidades: string[];
    municipios: string[];
    colonias: string[];
}
