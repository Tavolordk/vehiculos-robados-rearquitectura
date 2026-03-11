export interface DenunciaVehiculoAsociadoEntity {
    marca: string;
    submarca: string;
    color: string;
    placa: string;
}

export interface DenunciaVehiculoEntity {
    marca: string;
    submarca: string;
    modelo: string;
    color: string;
    placaPermiso: string;
    serieVin: string;
    nrpv: string;
}

export interface DenunciaInfoRoboEntity {
    folio: string;
    fechaRobo: string;
    horaCaptura: string;
    entidad: string;
    municipio: string;
    colonia: string;
    calle: string;
    cp: string;
    referencia: string;
    tramo: string;
    kilometro: string;
    latitud: string;
    longitud: string;
}

export interface DenunciaModusResumenEntity {
    modalidad: string;
    victimas: string;
    presuntos: string;
    tipoLugar: string;
    seHacePasarPor: string;
    peculiaridades: string;
    senas: string;
    vestimenta: string;
    comportamiento: string;
    armas: string;
    delitos: string;
}

export interface DenunciaPersonaResumenEntity {
    tipoPersona: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    sexo: string;
    telefono: string;
    rfc: string;
    correo: string;
}

export interface DenunciaAveriguacionResumenEntity {
    numero: string;
    agencia: string;
    agente: string;
}

export interface DenunciaVerificacionEntity {
    folio: string;
    fechaRegistro: string;
    infoRobo: DenunciaInfoRoboEntity;
    modus: DenunciaModusResumenEntity;
    vehiculosAsociados: DenunciaVehiculoAsociadoEntity[];
    denunciante: DenunciaPersonaResumenEntity;
    averiguacion: DenunciaAveriguacionResumenEntity;
    vehiculos: DenunciaVehiculoEntity[];
}

export interface ModalAltaDenunciaEntity {
    averiguacionPrevia: string;
    folio: string;
    placa: string;
    serieNiv: string;
}
