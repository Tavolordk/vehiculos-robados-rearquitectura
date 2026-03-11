export type FichaCriminogenaRadioEntity = 'si' | 'no';

export interface IntegranteRowEntity {
    noIntegrante: number;
    alias: string;
    nombre: string;
    primerApellido: string;
}

export interface IntegranteFormEntity {
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    alias: string;
    fechaNacimiento: string;
    lugarOrigen: string;
    complexion: string;
    colorPiel: string;
    estatura: string;
    cabelloCantidad: string;
    cabelloForma: string;
    cabelloColor: string;
    cejasDireccion: string;
    cejasForma: string;
    cejasTamano: string;
    ojosColor: string;
    ojosForma: string;
    ojosTamano: string;
    ocupacion: string;
    modalidad: string;
    senasParticulares: string;
    observaciones: string;
    calleNumero: string;
    referencia: string;
    colonia: string;
    entidad: string;
    municipio: string;
    cp: string;
}

export interface RecuperacionFichaCriminogenaFormEntity {
    folio: string;
    fechaHoraRegistro: string;
    fichaRadio: FichaCriminogenaRadioEntity | null;
    nombreBanda: string;
    modalidadDelictiva: string;
    medioComision: string;
    integrantes: IntegranteRowEntity[];
    formIntegrante: IntegranteFormEntity;
}