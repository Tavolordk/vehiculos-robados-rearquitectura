export type LugarTipoEntity = 'urbana' | 'coordenadas' | 'tramo';

export interface PredenunciaRoboFormEntity {
    folio: string;
    fechaRegistro: string;

    fechaRobo: string;
    horaRobo: string;
    modalidadRobo: string;
    entidad: string;
    municipio: string;

    lugarTipo: LugarTipoEntity;

    colonia: string;
    calle: string;
    numExt: string;
    numInt: string;
    cp: string;
    referencia: string;

    latitud: string;
    longitud: string;

    tramo: string;
    kilometro: string;
    descHechos: string;
}