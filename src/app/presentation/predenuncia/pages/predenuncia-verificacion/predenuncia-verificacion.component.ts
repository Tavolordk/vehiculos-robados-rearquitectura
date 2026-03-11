import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredenunciaVerificacionFacade } from '../../../../application/predenuncia/facades/predenuncia-verificacion.facade';

@Component({
    selector: 'app-predenuncia-verificacion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './predenuncia-verificacion.component.html',
    styleUrls: ['./predenuncia-verificacion.component.scss'],
})
export class PredenunciaVerificacionComponent {
    private readonly facade = inject(PredenunciaVerificacionFacade);

    get data() {
        return this.facade.data();
    }

    get folio(): string {
        return this.data.folio;
    }

    get fechaRegistro(): string {
        return this.data.fechaRegistro;
    }

    get robo() {
        return this.data.robo;
    }

    get denunciante() {
        return this.data.denunciante;
    }

    get vehiculos() {
        return this.data.vehiculos;
    }

    goToRobo(): void {
        this.facade.goToRobo();
    }

    goToDenunciante(): void {
        this.facade.goToDenunciante();
    }

    goToVehiculo(): void {
        this.facade.goToVehiculo();
    }

    onGuardar(): void {
        this.facade.onGuardar();
    }
}