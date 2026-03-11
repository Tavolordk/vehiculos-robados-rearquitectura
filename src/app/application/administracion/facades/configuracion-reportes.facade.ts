import { Injectable, inject } from '@angular/core';
import { ConfiguracionReportesState } from '../state/configuracion-reportes.state';

@Injectable({ providedIn: 'root' })
export class ConfiguracionReportesFacade {
    private readonly state = inject(ConfiguracionReportesState);

    readonly form = this.state.form;

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value } as never);
    }

    onArchivoSeleccionado(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        this.state.setArchivoNombre(file.name);
    }

    onVerDocumento(index: number): void {
        const doc = this.state.form().documentos[index];
        console.log('Ver documento:', doc);
    }

    onEliminarDocumento(index: number): void {
        const docs = this.state.form().documentos.filter((_, i) => i !== index);
        this.state.setDocumentos(docs);
    }

    onAceptar(): void {
        console.log('Aceptar configuración de reportes:', this.state.form());
    }
}
