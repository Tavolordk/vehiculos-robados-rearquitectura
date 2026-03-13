import { Injectable, signal } from '@angular/core';

export type SidebarStepKey =
    | 'predenuncia.vehiculo'
    | 'predenuncia.robo'
    | 'predenuncia.denunciante'
    | 'predenuncia.verificacion'
    | 'denuncia.vehiculo'
    | 'denuncia.robo'
    | 'denuncia.denunciante'
    | 'denuncia.modus'
    | 'denuncia.verificacion'
    | 'recuperacion.info'
    | 'recuperacion.vehiculo'
    | 'recuperacion.ficha'
    | 'recuperacion.verificacion'
    | 'entrega.vehiculo'
    | 'entrega.inspeccion'
    | 'entrega.documentacion'
    | 'entrega.verificacion';

@Injectable({ providedIn: 'root' })
export class SidebarProgressState {
    private readonly _completedSteps = signal<Partial<Record<SidebarStepKey, boolean>>>({});

    readonly completedSteps = this._completedSteps.asReadonly();

    markStepCompleted(step: SidebarStepKey): void {
        this._completedSteps.update((current) => ({
            ...current,
            [step]: true,
        }));
    }

    markStepIncomplete(step: SidebarStepKey): void {
        this._completedSteps.update((current) => ({
            ...current,
            [step]: false,
        }));
    }

    setStepCompleted(step: SidebarStepKey, completed: boolean): void {
        this._completedSteps.update((current) => ({
            ...current,
            [step]: completed,
        }));
    }

    isStepCompleted(step: SidebarStepKey): boolean {
        return !!this._completedSteps()[step];
    }

    clearSection(prefix: 'predenuncia' | 'denuncia' | 'recuperacion' | 'entrega'): void {
        this._completedSteps.update((current) => {
            const updated = { ...current };

            Object.keys(updated).forEach((key) => {
                if (key.startsWith(`${prefix}.`)) {
                    updated[key as SidebarStepKey] = false;
                }
            });

            return updated;
        });
    }

    clearAll(): void {
        this._completedSteps.set({});
    }
}