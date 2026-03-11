export type TipoPersonaDenunciaEntity = 'fisica' | 'moral';

export interface DenunciaDenuncianteIdentificacionEntity {
    tipoPersona: TipoPersonaDenunciaEntity;
    nombreRazon: string;
    primerApellido: string;
    segundoApellido: string;
    curp: string;
    rfc: string;
    sexo: string;
    telefono: string;
    correo: string;
}

export interface DenunciaDenuncianteDomicilioEntity {
    mismoDomicilioRobo: boolean;
    entidad: string;
    municipio: string;
    colonia: string;
    calle: string;
    numExterior: string;
    numInterior: string;
    cp: string;
}

export interface DenunciaDenunciantePayloadEntity {
    folio: string;
    fechaRegistro: string;
    identificacion: DenunciaDenuncianteIdentificacionEntity;
    domicilio: DenunciaDenuncianteDomicilioEntity;
}

export interface DenunciaDenuncianteFormEntity {
    folio: string;
    fechaRegistro: string;

    tipoPersona: TipoPersonaDenunciaEntity;

    nombreRazon: string;
    primerApellido: string;
    segundoApellido: string;

    curp: string;
    rfc: string;
    sexo: string;

    telefono: string;
    correo: string;

    mismoDomicilioRobo: boolean;

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
}