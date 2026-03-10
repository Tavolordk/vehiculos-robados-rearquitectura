export interface VehiculoEntity {
    vin: string;
    placa: string | null;
    numeroMotor: string | null;
    marca: string | null;
    submarca: string | null;
    modelo: string | null;
    color: string | null;
    estatus: string | null;
    fechaReporte: string | null;
    autoridad: string | null;
    averiguacionPrevia: string | null;
    propietario: string | null;
    observaciones: string | null;
}