import { Injectable, inject } from '@angular/core';
import { PredenunciaVehiculoState } from '../state/predenuncia-vehiculo.state';
import { AutoRowEntity } from '../../../domain/predenuncia/entities/vehiculo.entity';

@Injectable({ providedIn: 'root' })
export class PredenunciaVehiculoFacade {
    private readonly state = inject(PredenunciaVehiculoState);

    readonly form = this.state.form;
    readonly rows = this.state.rows;

    updateField(field: string, value: string): void {
        this.state.updateForm({ [field]: value });
    }

    onBuscar(): void {
        console.log('buscar');
    }

    onAgregarAuto(): void {
        console.log('agregar');
    }

    onEliminar(row: AutoRowEntity): void {
        console.log('eliminar', row);

        const filtered = this.state.rows().filter((item) => item !== row);
        this.state.setRows(filtered);
    }

    onEditar(row: AutoRowEntity): void {
        console.log('editar', row);

        this.state.updateForm({
            marca: row.marca,
            submarca: row.submarca,
            modelo: row.anio,
            color: row.color,
            placa: row.placa,
        });
    }

    onSiguiente(): void {
        console.log('siguiente');
    }

    clearForm(): void {
        this.state.clearForm();
    }
}