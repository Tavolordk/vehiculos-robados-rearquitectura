import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EntregaVehiculoFacade } from '../../../../application/administracion/facades/entrega-vehiculo.facade';

@Component({
    selector: 'app-entrega-vehiculo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './entrega-vehiculo.component.html',
    styleUrls: ['./entrega-vehiculo.component.scss'],
})
export class EntregaVehiculoComponent {
    private readonly facade = inject(EntregaVehiculoFacade);

    get data() {
        return this.facade.data();
    }

    get folio(): string {
        return this.data.folio;
    }

    get fechaHoraRegistro(): string {
        return this.data.fechaHoraRegistro;
    }

    get info() {
        return this.data.info;
    }

    get entrega() {
        return this.data.entrega;
    }

    get catalogos() {
        return this.data.catalogos;
    }

    updateEntregaField(field: string, value: string): void {
        this.facade.updateEntregaField(field, value);
    }

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}