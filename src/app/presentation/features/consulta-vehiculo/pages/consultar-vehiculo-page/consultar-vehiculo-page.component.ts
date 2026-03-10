import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConsultaVehiculoFacade } from '../../../../../application/consulta-vehiculo/facades/consulta-vehiculo.facade';
import { DetalleConsultaModalComponent } from '../../components/detalle-consulta-modal/detalle-consulta-modal.component';
import { ConsultaResultadoModalComponent } from '../../components/consulta-resultado-card/consulta-resultado-card.component';

@Component({
    selector: 'app-consultar-vehiculo-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DetalleConsultaModalComponent,
        ConsultaResultadoModalComponent,
    ],
    templateUrl: './consultar-vehiculo-page.component.html',
    styleUrls: ['./consultar-vehiculo-page.component.scss'],
})
export class ConsultarVehiculoPageComponent {
    private readonly facade = inject(ConsultaVehiculoFacade);

    readonly detalleOpen = signal(false);
    readonly resultadoModalOpen = signal(false);

    get vin(): string {
        return this.facade.vin();
    }

    set vin(value: string) {
        this.facade.setVin(value);
    }

    get loading(): boolean {
        return this.facade.loading();
    }

    get errorMsg(): string {
        return this.facade.errorMsg();
    }

    get result() {
        return this.facade.result();
    }

    canSearch(): boolean {
        return this.facade.canSearch();
    }

    onClear(): void {
        this.facade.clear();
        this.detalleOpen.set(false);
        this.resultadoModalOpen.set(false);
    }

    onSearch(): void {
        this.facade.searchDemo();
    }

    openDetalle(): void {
        if (!this.result) return;
        this.detalleOpen.set(true);
    }

    closeDetalle(): void {
        this.detalleOpen.set(false);
    }

    openResultadoModal(): void {
        if (!this.result) return;
        this.resultadoModalOpen.set(true);
    }

    closeResultadoModal(): void {
        this.resultadoModalOpen.set(false);
    }

    get detalleData() {
        return this.facade.buildDetalleDemo();
    }

    get resultadoModalData() {
        return this.facade.buildResultadoModalDemo();
    }

    onImprimirResultado(): void {
        window.print();
    }
}