export interface RoboInfoEntity {
    folio: string;
    fechaRobo: string;
    entidad: string;
    municipio: string;
    colonia: string;
    calle: string;
    cp: string;
    modalidad: string;
    horaCaptura: string;
    referencia?: string | null;
    tramo?: string | null;
    kilometro?: string | null;
    latitud?: string | null;
    longitud?: string | null;
}

export interface DenuncianteInfoEntity {
    tipoPersona: string;
    nombres: string;
    apellido1: string;
    apellido2: string;
    sexo: string;
    telefono: string;
    rfc: string;
    correo: string;
}

export interface VehiculoInfoEntity {
    marca: string;
    submarca: string;
    modelo: string;
    color: string;
    placaPermiso: string;
    serieVin: string;
    nrpv: string;
}

export interface PredenunciaVerificacionEntity {
    folio: string;
    fechaRegistro: string;
    robo: RoboInfoEntity;
    denunciante: DenuncianteInfoEntity;
    vehiculos: VehiculoInfoEntity[];
}