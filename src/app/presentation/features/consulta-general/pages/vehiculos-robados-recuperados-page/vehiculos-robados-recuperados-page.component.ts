import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConsultaGeneralFacade } from '../../../../../application/consulta-general/facades/consulta-general.facade';
import { DetalleConsultaModalComponent } from '../../../consulta-vehiculo/components/detalle-consulta-modal/detalle-consulta-modal.component';
import { ConsultaGeneralRowEntity } from '../../../../../domain/consulta-general/entities/consulta-general-row.entity';
import { ModalDetalleConsultaComponent } from '../../components/modal-detalle-consulta/modal-detalle-consulta.component';

@Component({
    selector: 'app-vehiculos-robados-recuperados-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DetalleConsultaModalComponent,
        ModalDetalleConsultaComponent,
    ],
    templateUrl: './vehiculos-robados-recuperados-page.component.html',
    styleUrls: ['./vehiculos-robados-recuperados-page.component.scss'],
})
export class VehiculosRobadosRecuperadosPageComponent {
    private readonly facade = inject(ConsultaGeneralFacade);

    readonly predenunciaOpen = signal(false);
    readonly denunciaOpen = signal(false);

    readonly predenunciaData = signal(this.facade.buildPredenunciaData(this.facade.rows()[0]));
    readonly denunciaData = signal(this.facade.buildDenunciaData(this.facade.rows()[0]));

    get searchType() { return this.facade.searchType(); }
    set searchType(value) { this.facade.setSearchType(value); }

    get fechaDel() { return this.facade.fechaDel(); }
    set fechaDel(value: string) { this.facade.setFechaDel(value); }

    get fechaAl() { return this.facade.fechaAl(); }
    set fechaAl(value: string) { this.facade.setFechaAl(value); }

    get folioPredenuncia() { return this.facade.folioPredenuncia(); }
    set folioPredenuncia(value: string) { this.facade.setFolioPredenuncia(value); }

    get placaPermiso() { return this.facade.placaPermiso(); }
    set placaPermiso(value: string) { this.facade.setPlacaPermiso(value); }

    get serieVin() { return this.facade.serieVin(); }
    set serieVin(value: string) { this.facade.setSerieVin(value); }

    get nrpv() { return this.facade.nrpv(); }
    set nrpv(value: string) { this.facade.setNrpv(value); }

    get averiguacionPrevia() { return this.facade.averiguacionPrevia(); }
    set averiguacionPrevia(value: string) { this.facade.setAveriguacionPrevia(value); }

    get noMotor() { return this.facade.noMotor(); }
    set noMotor(value: string) { this.facade.setNoMotor(value); }

    get entidadRobo() { return this.facade.entidadRobo(); }
    set entidadRobo(value: string) { this.facade.setEntidadRobo(value); }

    get municipio() { return this.facade.municipio(); }
    set municipio(value: string) { this.facade.setMunicipio(value); }

    get fuenteInfo() { return this.facade.fuenteInfo(); }
    set fuenteInfo(value: string) { this.facade.setFuenteInfo(value); }

    get marca() { return this.facade.marca(); }
    set marca(value: string) { this.facade.setMarca(value); }

    get submarca() { return this.facade.submarca(); }
    set submarca(value: string) { this.facade.setSubmarca(value); }

    get modelo() { return this.facade.modelo(); }
    set modelo(value: string) { this.facade.setModelo(value); }

    get validationMsg() { return this.facade.validationMsg(); }
    get rows() { return this.facade.rows(); }

    hasAnyCriteria(): boolean {
        return this.facade.hasAnyCriteria();
    }

    onClear(): void {
        this.facade.clear();
    }

    onSearch(): void {
        const ok = this.facade.search();
        if (!ok) {
            return;
        }

        console.log('Buscar con filtros');
    }

    onView(row: ConsultaGeneralRowEntity): void {
        if (this.facade.isPredenuncia(row.estatus)) {
            this.denunciaOpen.set(false);
            this.predenunciaData.set(this.facade.buildPredenunciaData(row));
            this.predenunciaOpen.set(true);
            return;
        }

        this.predenunciaOpen.set(false);
        this.denunciaData.set(this.facade.buildDenunciaData(row));
        this.denunciaOpen.set(true);
    }

    onClosePredenuncia(): void {
        this.predenunciaOpen.set(false);
    }

    onCloseDenuncia(): void {
        this.denunciaOpen.set(false);
    }

    onEditarDenuncia(seccion: 'robo' | 'denunciante' | 'modus' | 'averiguacion' | 'vehiculos'): void {
        console.log('Editar denuncia sección:', seccion);
    }

    onRecover(row: ConsultaGeneralRowEntity): void {
        console.log('Recuperar', row);
    }

    onEdit(row: ConsultaGeneralRowEntity): void {
        console.log('Editar', row);
    }

    onContract(row: ConsultaGeneralRowEntity): void {
        console.log('Contrato', row);
    }
}