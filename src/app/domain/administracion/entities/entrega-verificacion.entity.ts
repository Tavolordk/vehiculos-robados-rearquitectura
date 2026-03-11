export type EntregaVerificacionEditSection =
    | 'entregaVehiculo'
    | 'infoEntrega'
    | 'inspeccion'
    | 'alteraciones'
    | 'observaciones'
    | 'docPropietario';

export interface EntregaVehiculoResumenEntity {
    carpetaInvestigacion: string;
    folioDenuncia: string;
    fechaDenuncia: string;
    horaDenuncia: string;
    fechaRobo: string;
    horaRobo: string;
    fechaRecuperacion: string;
    horaRecuperacion: string;
    serie: string;
    placa: string | null;
}

export interface InfoEntregaResumenEntity {
    fechaEntrega: string;
    horaEntrega: string;
    calleNumero: string;
    referencia: string;
    colonia: string;
    municipio: string;
    entidad: string;
    cp: string;
}

export interface InspeccionResumenEntity {
    ministerial: boolean;
    porcentajeRecuperacion: number | string;
    valorUnidad: string;
}

export interface AlteracionesResumenEntity {
    serieAlterada: string;
    motorAlterado: string;
}

export interface DocPropietarioResumenEntity {
    tipoPersona: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    credencialElector: string;
    pasaporte: string;
    cedulaProfesional: string;
    comprobanteDomicilio: string;
    otroDocumento: string;
}

export interface EntregaVerificacionPageEntity {
    pageTitle: string;
    subHeader: string;
    usuarioNombre: string;
    usuarioRol: string;
    folio: string;
    fechaHoraRegistro: string;
    entregaVehiculo: EntregaVehiculoResumenEntity;
    infoEntrega: InfoEntregaResumenEntity;
    inspeccion: InspeccionResumenEntity;
    alteraciones: AlteracionesResumenEntity;
    observaciones: string;
    docPropietario: DocPropietarioResumenEntity;
}