import { Injectable, computed, signal } from '@angular/core';
import { VinResultEntity } from '../../../domain/consulta-vehiculo/entities/vin-result.entity';

@Injectable({ providedIn: 'root' })
export class ConsultaVehiculoState {
    private readonly _vin = signal('');
    private readonly _loading = signal(false);
    private readonly _errorMsg = signal('');
    private readonly _result = signal<VinResultEntity | null>(null);

    readonly vin = this._vin.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly errorMsg = this._errorMsg.asReadonly();
    readonly result = this._result.asReadonly();
    readonly hasResult = computed(() => !!this._result());

    setVin(value: string): void {
        this._vin.set(value);
    }

    setLoading(value: boolean): void {
        this._loading.set(value);
    }

    setErrorMsg(value: string): void {
        this._errorMsg.set(value);
    }

    setResult(value: VinResultEntity | null): void {
        this._result.set(value);
    }

    clear(): void {
        this._vin.set('');
        this._loading.set(false);
        this._errorMsg.set('');
        this._result.set(null);
    }
}