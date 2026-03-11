import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EntregaExitoFacade } from '../../../../application/administracion/facades/entrega-exito.facade';

@Component({
    selector: 'app-entrega-exito',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './entrega-exito.component.html',
    styleUrls: ['./entrega-exito.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntregaExitoComponent {
    private readonly facade = inject(EntregaExitoFacade);

    get data() {
        return this.facade.data();
    }

    get averiguacionPrevia(): string {
        return this.data.averiguacionPrevia;
    }

    get estatusDenuncia(): string {
        return this.data.estatusDenuncia;
    }

    get folioEntrega(): string {
        return this.data.folioEntrega;
    }

    get placa(): string {
        return this.data.placa;
    }

    get serieNiv(): string {
        return this.data.serieNiv;
    }

    onCerrar(): void {
        this.facade.onCerrar();
    }

    onImprimir(): void {
        this.facade.onImprimir();
    }
}