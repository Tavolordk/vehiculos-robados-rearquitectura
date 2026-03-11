export type TipoPersonaDocumentacionEntity = 'PROPIETARIO' | 'REPRESENTANTE';

export interface DocumentacionPropietarioFormEntity {
    tipoPersona: TipoPersonaDocumentacionEntity;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    numeroFactura: string;
    fechaFactura: string;
    credencialElector: string;
    pasaporte: string;
    cedulaProfesional: string;
    comprobanteDomicilio: string;
    otroDocumento: string;
}

export interface DocumentacionPropietarioPageEntity {
    folio: string;
    fechaHoraRegistro: string;
    form: DocumentacionPropietarioFormEntity;
}