export const CATALOGOS_ENDPOINTS = {
    delitos: {
        delito: 'api/v1/catalogos/delitos/delito',
        medioComision: 'api/v1/catalogos/delitos/medioComision',
        arma: 'api/v1/catalogos/delitos/arma',
        modalidadDelictiva: 'api/v1/catalogos/delitos/modalidadDelictiva',
        modalidadRobo: 'api/v1/catalogos/delitos/modalidadRobo',
    },
    personas: {
        tipoPersona: 'api/v1/catalogos/personas/tipoPersona',
        sexo: 'api/v1/catalogos/personas/sexo',
        colorPiel: 'api/v1/catalogos/personas/colorPiel',
        complexion: 'api/v1/catalogos/personas/complexion',
    },
    reportes: {
        fuente: 'api/v1/catalogos/reportes/fuente',
        tipoUso: 'api/v1/catalogos/reportes/tipoUso',
        motivoCancelacion: 'api/v1/catalogos/reportes/motivoCancelacion',
        estatusReporte: 'api/v1/catalogos/reportes/estatusReporte',
    },
    ubicacion: {
        modoUbicacion: 'api/v1/catalogos/ubicacion/modoUbicacion',
        tipoLugar: 'api/v1/catalogos/ubicacion/tipoLugar',
    },
    vehiculos: {
        color: 'api/v1/catalogos/vehiculos/color',
        marca: 'api/v1/catalogos/vehiculos/marca',
        submarca: (marcaId: number) => `api/v1/catalogos/vehiculos/submarca/${marcaId}`,
        tipoVehiculo: 'api/v1/catalogos/vehiculos/tipoVehiculo',
        tipoUsoVehiculo: 'api/v1/catalogos/vehiculos/tipoUsoVehiculo',
    },
    version: 'api/version',
} as const;