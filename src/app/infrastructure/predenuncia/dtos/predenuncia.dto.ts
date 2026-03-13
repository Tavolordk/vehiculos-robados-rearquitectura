export interface ApiResponseDto<T> {
    success: boolean;
    message?: string | null;
    traceId?: string | null;
    data: T;
}

export interface PredenunciaVehiculoRequestDto {
    placa?: string | null;
    niv?: string | null;
    motor?: string | null;
    nrpv?: string | null;
    lineaId?: number | null;
    modeloAnio?: number | null;
    color?: string | null;
    tipoVehiculoId?: number | null;
    tipoUsoId?: number | null;
    entidadPlacaId?: number | null;
    permiso?: string | null;
    senas?: string | null;
    esPrincipal: boolean;
}

export interface CrearPredenunciaRequestDto {
    usuarioId: number;
    entidadId: number;
    tzUsuario?: string | null;
    divgeoHechosId?: number | null;

    denCurp?: string | null;
    denRfc?: string | null;
    denNombres?: string | null;
    denPrimerAp?: string | null;
    denSegundoAp?: string | null;
    denFechaNac?: string | null;
    denTelefono?: string | null;
    denCorreo?: string | null;
    denTipoPersonaId: number;
    denSexoId?: number | null;

    denDomEntidadId?: number | null;
    denDomMunicipioId?: number | null;
    denDomLocalidadId?: number | null;
    denDomColoniaId?: number | null;
    denDomCp?: string | null;
    denDomCalle?: string | null;
    denDomNumExt?: string | null;
    denDomNumInt?: string | null;
    denDomReferencia?: string | null;

    fechaRobo: string;
    horaRobo?: string | null;
    descHechos?: string | null;
    modalidadRoboId: number;

    ubicModoId: number;
    ubicEntidadId?: number | null;
    ubicMunicipioId?: number | null;
    ubicLocalidadId?: number | null;
    ubicColoniaId?: number | null;
    ubicCp?: string | null;
    ubicCalle?: string | null;
    ubicNumExt?: string | null;
    ubicNumInt?: string | null;
    ubicReferencia?: string | null;
    ubicLatitud?: number | null;
    ubicLongitud?: number | null;
    ubicTramo?: string | null;
    ubicKm?: number | null;

    vehiculos?: PredenunciaVehiculoRequestDto[] | null;

    facturaNumero?: string | null;
    facturaFecha?: string | null;
    propObservaciones?: string | null;
}

export interface CrearPredenunciaResponseDto {
    reporteId?: number | null;
    folio?: string | null;
    codigo: number;
    mensaje?: string | null;
}

export interface ConsultarPredenunciaVehiculoResponseDto {
    reporteVehiculoId?: number | null;
    esPrincipal?: boolean | null;
    vehiculoId?: number | null;
    placa?: string | null;
    niv?: string | null;
    motor?: string | null;
    nrpv?: string | null;
    modeloAnio?: number | null;
    color?: string | null;
    lineaId?: number | null;
    lineaNombre?: string | null;
    lineaNivel?: string | null;
    submarcaId?: number | null;
    submarcaNombre?: string | null;
    marcaId?: number | null;
    marcaNombre?: string | null;
    tipoVehiculoId?: number | null;
    tipoVehiculoNombre?: string | null;
    tipoUsoId?: number | null;
    tipoUsoNombre?: string | null;
    entidadPlacaId?: number | null;
    entidadPlacaNombre?: string | null;
    permiso?: string | null;
    senasParticulares?: string | null;
}

export interface ConsultarPredenunciaResponseDto {
    vehiculos?: ConsultarPredenunciaVehiculoResponseDto[] | null;
}