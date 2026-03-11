import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfiguracionReportesFacade } from '../../../../application/administracion/facades/configuracion-reportes.facade';

@Component({
    selector: 'app-configuracion-reportes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './configuracion-reportes.component.html',
    styleUrls: ['./configuracion-reportes.component.scss'],
})
export class ConfiguracionReportesComponent {
    private readonly facade = inject(ConfiguracionReportesFacade);

    get form() {
        return this.facade.form();
    }

    get tipoCargaGrafico(): string {
        return this.form.tipoCargaGrafico;
    }
    set tipoCargaGrafico(value: string) {
        this.facade.updateField('tipoCargaGrafico', value);
    }

    get tipoModTexto(): string {
        return this.form.tipoModTexto;
    }
    set tipoModTexto(value: string) {
        this.facade.updateField('tipoModTexto', value);
    }

    get archivoNombre(): string {
        return this.form.archivoNombre;
    }

    get correoComprobante(): string {
        return this.form.correoComprobante;
    }
    set correoComprobante(value: string) {
        this.facade.updateField('correoComprobante', value);
    }

    get documentos() {
        return this.form.documentos;
    }

    onArchivoSeleccionado(event: Event): void {
        this.facade.onArchivoSeleccionado(event);
    }

    onVerDocumento(index: number): void {
        this.facade.onVerDocumento(index);
    }

    onEliminarDocumento(index: number): void {
        this.facade.onEliminarDocumento(index);
    }

    onAceptar(): void {
        this.facade.onAceptar();
    }
}
