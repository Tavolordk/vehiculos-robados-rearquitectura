import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PadronVehicularFacade } from '../../../../../application/padron-vehicular/facades/padron-vehicular.facade';
import { PadronConsultaResultadoEntity } from '../../../../../domain/padron-vehicular/entities/consulta-resultado.entity';
import { PadronRowEntity } from '../../../../../domain/padron-vehicular/entities/padron-row.entity';
import { ConsultaResultadoModalComponent } from '../../../consulta-vehiculo/components/consulta-resultado-card/consulta-resultado-card.component';

@Component({
    selector: 'app-padron-vehicular-page',
    standalone: true,
    imports: [CommonModule, FormsModule, ConsultaResultadoModalComponent],
    templateUrl: './padron-vehicular-page.component.html',
    styleUrls: ['./padron-vehicular-page.component.scss'],
})
export class PadronVehicularPageComponent {
    private readonly facade = inject(PadronVehicularFacade);

    modalId = 'consultaModal';

    @ViewChild(ConsultaResultadoModalComponent)
    modalCmp!: ConsultaResultadoModalComponent;

    modalData: PadronConsultaResultadoEntity = {
        propietario: {
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            calleNumero: '',
            cp: '',
            colonia: '',
            entidad: '',
            municipio: '',
        },
        vehiculo: {
            entidad: '',
            marca: '',
            submarca: '',
            anioModelo: '',
            color: '',
            motor: '',
            serieNiv: '',
            nrpv: '',
            rfv: '',
        },
    };

    get propNombre() { return this.facade.propNombre(); }
    set propNombre(value: string) { this.facade.setPropNombre(value); }

    get propApellido1() { return this.facade.propApellido1(); }
    set propApellido1(value: string) { this.facade.setPropApellido1(value); }

    get propApellido2() { return this.facade.propApellido2(); }
    set propApellido2(value: string) { this.facade.setPropApellido2(value); }

    get serieNiv() { return this.facade.serieNiv(); }
    set serieNiv(value: string) { this.facade.setSerieNiv(value); }

    get placa() { return this.facade.placa(); }
    set placa(value: string) { this.facade.setPlaca(value); }

    get motor() { return this.facade.motor(); }
    set motor(value: string) { this.facade.setMotor(value); }

    get marca() { return this.facade.marca(); }
    set marca(value: string) { this.facade.setMarca(value); }

    get submarca() { return this.facade.submarca(); }
    set submarca(value: string) { this.facade.setSubmarca(value); }

    get modelo() { return this.facade.modelo(); }
    set modelo(value: string) { this.facade.setModelo(value); }

    get tipoVehiculo() { return this.facade.tipoVehiculo(); }
    set tipoVehiculo(value: string) { this.facade.setTipoVehiculo(value); }

    get entidad() { return this.facade.entidad(); }
    set entidad(value: string) { this.facade.setEntidad(value); }

    get nrpv() { return this.facade.nrpv(); }
    set nrpv(value: string) { this.facade.setNrpv(value); }

    get rfv() { return this.facade.rfv(); }
    set rfv(value: string) { this.facade.setRfv(value); }

    get marcas() { return this.facade.marcas(); }
    get submarcas() { return this.facade.submarcas(); }
    get modelos() { return this.facade.modelos(); }
    get tiposVehiculo() { return this.facade.tiposVehiculo(); }
    get entidades() { return this.facade.entidades(); }
    get rows() { return this.facade.rows(); }
    get page() { return this.facade.page(); }
    get totalPages() { return this.facade.totalPages(); }
    get pages() { return this.facade.pages(); }

    onMarcaChange(): void {
        this.facade.onMarcaChange();
    }

    hasAnyCriteria(): boolean {
        return this.facade.hasAnyCriteria();
    }

    onClear(): void {
        this.facade.clear();
    }

    onSearch(): void {
        this.facade.search();

        const rows = this.facade.rows();
        if (rows.length > 0) {
            this.setModalFromRow(rows[0]);
            this.openModal();
        }
    }

    onView(row: PadronRowEntity): void {
        this.setModalFromRow(row);
        this.openModal();
    }

    private openModal(): void {
        if (!this.modalCmp) {
            console.warn('modalCmp aún no está listo (ViewChild).');
            return;
        }
        this.modalCmp.open();
    }

    private setModalFromRow(row: PadronRowEntity): void {
        this.modalData = this.facade.buildModalData(row);
    }

    onImprimirModal(): void {
        window.print();
    }

    onModalClosed(): void {
        // opcional
    }

    goToPage(p: number): void {
        this.facade.goToPage(p);
    }

    prevPage(): void {
        this.facade.prevPage();
    }

    nextPage(): void {
        this.facade.nextPage();
    }
}