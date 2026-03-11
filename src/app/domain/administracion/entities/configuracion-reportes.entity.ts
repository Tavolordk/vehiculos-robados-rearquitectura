export type TipoCargaGraficoEntity = 'grafico-izquierdo' | 'grafico-derecho' | '';
export type TipoModTextoEntity = 'elementos-texto' | '';

export interface DocumentoConfiguracionReporteEntity {
    tipoDocumento: string;
    nombreArchivo: string;
}

export interface ConfiguracionReportesFormEntity {
    tipoCargaGrafico: TipoCargaGraficoEntity;
    tipoModTexto: TipoModTextoEntity;
    archivoNombre: string;
    correoComprobante: string;
    documentos: DocumentoConfiguracionReporteEntity[];
}
