export interface RoboDetalleEntity {
    folio: string;
    fechaRobo: string;
    horaCaptura: string;
    entidad: string;
    municipio: string;
    colonia: string;
    calle: string;
    cp: string;
    referencia?: string | null;
    tramo?: string | null;
    kilometro?: string | null;
    latitud?: string | null;
    longitud?: string | null;
    modalidad: string;
}

export interface DenuncianteDetalleEntity {
    tipoPersona: string;
    nombres: string;
    apellido1: string;
    apellido2: string;
    sexo: string;
    telefono: string;
    rfc: string;
    correo: string;
}

export interface VehiculoDetalleEntity {
    marca: string;
    submarca: string;
    modelo: string;
    color: string;
    placaPermiso: string;
    serieVin: string;
    nrpv: string;
}

export interface DetalleConsultaEntity {
    robo: RoboDetalleEntity;
    denunciante: DenuncianteDetalleEntity;
    vehiculos: VehiculoDetalleEntity[];
}

export type TipoDetalleEntity = 'predenuncia' | 'denuncia';