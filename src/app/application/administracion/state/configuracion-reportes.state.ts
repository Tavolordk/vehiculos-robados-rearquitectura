import { Injectable, signal } from '@angular/core';
import { ConfiguracionReportesFormEntity } from '../../../domain/administracion/entities/configuracion-reportes.entity';

@Injectable({ providedIn: 'root' })
export class ConfiguracionReportesState {
    private readonly _form = signal<ConfiguracionReportesFormEntity>({
        tipoCargaGrafico: '',
        tipoModTexto: '',
        archivoNombre: '',
        correoComprobante: '',
        documentos: [
            {
                tipoDocumento: 'Gráfico izquierdo',
                nombreArchivo: 'logo.jpg',
            },
            {
                tipoDocumento: 'Elemento de texto',
                nombreArchivo: 'carta.pdf',
            },
        ],
    });

    readonly form = this._form.asReadonly();

    updateForm(patch: Partial<ConfiguracionReportesFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    setArchivoNombre(nombre: string): void {
        this._form.update((current) => ({
            ...current,
            archivoNombre: nombre,
        }));
    }

    setDocumentos(documentos: ConfiguracionReportesFormEntity['documentos']): void {
        this._form.update((current) => ({
            ...current,
            documentos,
        }));
    }
}
