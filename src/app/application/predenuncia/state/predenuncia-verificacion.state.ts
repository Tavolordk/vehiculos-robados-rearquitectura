import { Injectable, signal } from '@angular/core';
import { PredenunciaVerificacionEntity } from '../../../domain/predenuncia/entities/predenuncia-verificacion.entity';

@Injectable({ providedIn: 'root' })
export class PredenunciaVerificacionState {
    private readonly _data = signal<PredenunciaVerificacionEntity | null>(null);
    private readonly _loading = signal<boolean>(false);
    private readonly _error = signal<string | null>(null);

    readonly data = this._data.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    setData(data: PredenunciaVerificacionEntity | null): void {
        this._data.set(data);
    }

    setLoading(value: boolean): void {
        this._loading.set(value);
    }

    setError(message: string | null): void {
        this._error.set(message);
    }

    clear(): void {
        this._data.set(null);
        this._loading.set(false);
        this._error.set(null);
    }
}