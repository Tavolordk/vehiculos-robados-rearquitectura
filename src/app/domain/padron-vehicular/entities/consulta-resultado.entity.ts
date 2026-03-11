export interface PadronConsultaResultadoEntity {
    propietario: {
        nombres: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
        calleNumero: string;
        cp: string;
        colonia: string;
        entidad: string;
        municipio?: string;
    };
    vehiculo: {
        entidad?: string;
        marca: string;
        submarca: string;
        anioModelo: string | number;
        color: string;
        motor: string;
        serieNiv: string;
        nrpv: string;
        rfv: string;
    };
}