import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredenunciaVerificacionFacade } from '../../../../application/predenuncia/facades/predenuncia-verificacion.facade';

@Component({
    selector: 'app-predenuncia-verificacion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './predenuncia-verificacion.component.html',
    styleUrls: ['./predenuncia-verificacion.component.scss'],
})
export class PredenunciaVerificacionComponent implements OnInit {
    private readonly facade = inject(PredenunciaVerificacionFacade);

    ngOnInit(): void {
        this.facade.hydrateFromForms();
    }

    get data() {
        return this.facade.data();
    }

    get loading(): boolean {
        return this.facade.loading();
    }

    get error(): string | null {
        return this.facade.error();
    }

    get folio(): string {
        return this.data?.folio ?? '';
    }

    get fechaRegistro(): string {
        return this.data?.fechaRegistro ?? '';
    }

    get robo() {
        return this.data?.robo ?? null;
    }

    get denunciante() {
        return this.data?.denunciante ?? null;
    }

    get vehiculos() {
        return this.data?.vehiculos ?? [];
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