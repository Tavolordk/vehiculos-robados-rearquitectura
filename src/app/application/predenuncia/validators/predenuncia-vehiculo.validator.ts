import { PredenunciaVehiculoFormEntity } from '../../../domain/predenuncia/entities/vehiculo.entity';
import { ValidationResult } from '../../../shared/validation/validation.models';
import { ValidationPatterns } from '../../../shared/validation/validation.patterns';

export type PredenunciaVehiculoField =
    | 'placa'
    | 'procedenciaPlaca'
    | 'modelo'
    | 'entidad'
    | 'marca'
    | 'submarca'
    | 'color'
    | 'serieVin'
    | 'nrpv';

export class PredenunciaVehiculoValidator {
    static validate(form: PredenunciaVehiculoFormEntity): ValidationResult<PredenunciaVehiculoField> {
        const errors: Partial<Record<PredenunciaVehiculoField, string>> = {};

        if (!form.placa?.trim()) {
            errors.placa = 'La placa es obligatoria.';
        } else if (!ValidationPatterns.plate.test(form.placa.trim().toUpperCase())) {
            errors.placa = 'La placa no tiene un formato válido.';
        }

        if (!form.entidad?.trim()) {
            errors.entidad = 'La entidad es obligatoria.';
        }

        if (!form.marca?.trim()) {
            errors.marca = 'La marca es obligatoria.';
        }

        if (!form.submarca?.trim()) {
            errors.submarca = 'La submarca es obligatoria.';
        }

        if (!form.color?.trim()) {
            errors.color = 'El color es obligatorio.';
        }

        if (!form.modelo?.trim()) {
            errors.modelo = 'El modelo es obligatorio.';
        } else {
            const year = Number(form.modelo);
            const currentYear = new Date().getFullYear() + 1;
            if (!Number.isInteger(year) || year < 1900 || year > currentYear) {
                errors.modelo = 'El modelo debe ser un año válido.';
            }
        }

        if (form.serieVin?.trim() && !ValidationPatterns.vin.test(form.serieVin.trim().toUpperCase())) {
            errors.serieVin = 'El VIN debe tener 17 caracteres válidos.';
        }

        if (form.nrpv?.trim() && form.nrpv.trim().length < 4) {
            errors.nrpv = 'El NRPV no tiene un formato válido.';
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    }
}