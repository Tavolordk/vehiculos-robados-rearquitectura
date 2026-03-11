import { Injectable, inject } from '@angular/core';
import { DenunciaVehiculoState } from '../state/denuncia-vehiculo.state';
import { DenunciaVehiculoRowEntity } from '../../../domain/denuncia/entities/denuncia-vehiculo.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaVehiculoFacade {
    private readonly state = inject(DenunciaVehiculoState);

    private readonly submarcasMap: Record<string, string[]> = {
        NISSAN: ['TSURU', 'TIDA', 'VERSA', 'SENTRA'],
        CHEVROLET: ['CAPTIVA', 'AVEO', 'SPARK'],
        KIA: ['TUCSON', 'RIO', 'FORTE'],
        ITALIKA: ['ITALIKA'],
        BAJAJ: ['PULSAR N', 'DOMINAR'],
    };

    readonly form = this.state.form;
    readonly procedencias = this.state.procedencias;
    readonly tiposVehiculoList = this.state.tiposVehiculoList;
    readonly modelosList = this.state.modelosList;
    readonly entidadesList = this.state.entidadesList;
    readonly tiposUsoList = this.state.tiposUsoList;
    readonly marcasList = this.state.marcasList;
    readonly submarcasList = this.state.submarcasList;
    readonly coloresList = this.state.coloresList;
    readonly rows = this.state.rows;

    updateField(field: string, value: string | boolean): void {
        this.state.updateForm({ [field]: value } as never);
    }

    onMarcaChange(): void {
        const m = (this.state.form().marca || '').toUpperCase();

        if (!m || m === 'SELECCIONAR') {
            this.state.setSubmarcasList(['Seleccionar']);
            this.state.updateForm({ submarca: '' });
            return;
        }

        const list = this.submarcasMap[m] || [];
        this.state.setSubmarcasList(['Seleccionar', ...list]);

        if (this.state.form().submarca && !list.includes(this.state.form().submarca)) {
            this.state.updateForm({ submarca: '' });
        }
    }

    async onBuscarPlacaVin(): Promise<void> {
        this.state.updateForm({ loadingBuscar: true });

        try {
            const vin = (this.state.form().serieVin || '').trim();
            const placa = (this.state.form().placa || '').trim();

            if (!vin && !placa) return;

            this.state.updateForm({
                marca: 'NISSAN',
                submarca: '',
            });

            this.onMarcaChange();

            this.state.updateForm({
                submarca: 'TIDA',
                modelo: '2013',
                tipoVehiculo: 'AUTOMÓVIL',
                entidad: 'CDMX',
                color: 'NEGRO',
                noMotor: this.state.form().noMotor || 'MR18005637',
                nrpv: this.state.form().nrpv || '1234567',
            });
        } finally {
            this.state.updateForm({ loadingBuscar: false });
        }
    }

    onAgregarAuto(): void {
        const row: DenunciaVehiculoRowEntity = {
            marca: this.state.form().marca || '',
            submarca: this.state.form().submarca || '',
            anioModelo: this.state.form().modelo || '',
            color: this.state.form().color || '',
            placa: this.state.form().placa || '',
        };

        if (!row.placa.trim()) return;

        this.state.setRows([row, ...this.state.rows()]);
    }

    onEliminarRow(index: number): void {
        this.state.setRows(this.state.rows().filter((_, i) => i !== index));
    }

    onEditarRow(index: number): void {
        const r = this.state.rows()[index];

        this.state.updateForm({
            marca: (r.marca || '').toUpperCase(),
        });

        this.onMarcaChange();

        this.state.updateForm({
            submarca: (r.submarca || '').toUpperCase(),
            modelo: r.anioModelo || '',
            color: (r.color || '').toUpperCase(),
            placa: r.placa || '',
        });
    }

    onSiguiente(): void {
        console.log('Siguiente...');
    }
}