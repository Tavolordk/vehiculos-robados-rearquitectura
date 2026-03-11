import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperacionVehiculoFacade } from '../../../../application/administracion/facades/recuperacion-vehiculo.facade';

@Component({
    selector: 'app-admin-recuperacion-vehiculo',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recuperacion-vehiculo.component.html',
    styleUrls: ['./recuperacion-vehiculo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRecuperacionVehiculoComponent {
    private readonly facade = inject(RecuperacionVehiculoFacade);

    get form() {
        return this.facade.form();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaHoraRegistro(): string {
        return this.form.fechaHoraRegistro;
    }

    get vehiculo() {
        return this.form.vehiculo;
    }

    onNext(): void {
        this.facade.onNext();
    }
}