export type SiNoEntity = 'SI' | 'NO' | null;

export interface InspeccionMinisterialFormEntity {
    inspeccion: SiNoEntity;
    valorUnidad: string;
    porcentajeRecuperacion: string;
    serieNivAlterada: string;
    motorAlterado: string;
    observaciones: string;
}

export interface InspeccionMinisterialPageEntity {
    folio: string;
    fechaHoraRegistro: string;
    maxObs: number;
    form: InspeccionMinisterialFormEntity;
}