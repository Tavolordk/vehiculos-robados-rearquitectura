import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EntregaVerificacionFacade } from '../../../../application/administracion/facades/entrega-verificacion.facade';
import { EntregaVerificacionEditSection } from '../../../../domain/administracion/entities/entrega-verificacion.entity';

@Component({
    selector: 'app-entrega-verificacion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './entrega-verificacion.component.html',
    styleUrls: ['./entrega-verificacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntregaVerificacionComponent {
    private readonly facade = inject(EntregaVerificacionFacade);

    get data() {
        return this.facade.data();
    }

    get pageTitle() {
        return this.data.pageTitle;
    }

    get subHeader() {
        return this.data.subHeader;
    }

    get usuarioNombre() {
        return this.data.usuarioNombre;
    }

    get usuarioRol() {
        return this.data.usuarioRol;
    }

    get folio() {
        return this.data.folio;
    }

    get fechaHoraRegistro() {
        return this.data.fechaHoraRegistro;
    }

    get entregaVehiculo() {
        return this.data.entregaVehiculo;
    }

    get infoEntrega() {
        return this.data.infoEntrega;
    }

    get inspeccion() {
        return this.data.inspeccion;
    }

    get alteraciones() {
        return this.data.alteraciones;
    }

    get observaciones() {
        return this.data.observaciones;
    }

    get docPropietario() {
        return this.data.docPropietario;
    }

    onCerrarSesion(): void {
        this.facade.onCerrarSesion();
    }

    onEditar(seccion: EntregaVerificacionEditSection): void {
        this.facade.onEditar(seccion);
    }

    onGuardar(): void {
        this.facade.onGuardar();
    }
}