export type TipoPersonaEntity = 'fisica' | 'moral';

export interface PredenunciaDenuncianteFormEntity {
    folio: string;
    fechaRegistro: string;

    tipoPersona: TipoPersonaEntity;

    nombreRazonSocial: string;
    primerApellido: string;
    segundoApellido: string;

    curp: string;
    rfc: string;
    sexo: string;

    telefono: string;
    correo: string;
}