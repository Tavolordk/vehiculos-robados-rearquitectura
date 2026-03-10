export type VehiculoAsociadoEntity = {
    marca: string;
    submarca: string;
    color: string;
    placa: string;
};

export type VehiculoInfoEntity = {
    marca: string;
    submarca: string;
    modelo: string;
    color: string;
    placaPermiso: string;
    serieVin: string;
    nrpv: string;
};

export type RoboInfoEntity = {
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
};

export type DenuncianteInfoEntity = {
    tipoPersona: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    sexo: string;
    telefono: string;
    rfc: string;
    correo: string;
};

export type ModusInfoEntity = {
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
};

export type AveriguacionInfoEntity = {
    numero: string;
    agencia: string;
    agente: string;
};

export type DetalleModalDataEntity = {
    infoRobo: RoboInfoEntity;
    denunciante: DenuncianteInfoEntity;
    modus: ModusInfoEntity;
    averiguacion: AveriguacionInfoEntity;
    vehiculosAsociados: VehiculoAsociadoEntity[];
    vehiculos: VehiculoInfoEntity[];
};

export type TipoDetalleEntity = 'predenuncia' | 'denuncia';