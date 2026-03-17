import { PredenunciaRoboFormEntity } from '../../../domain/predenuncia/entities/predenuncia-robo.entity';
import { ValidationResult } from '../../../shared/validation/validation.models';
import { ValidationPatterns } from '../../../shared/validation/validation.patterns';
import { DateTimeUtils } from '../../../shared/validation/date-time.utils';

export type PredenunciaRoboField =
    | 'fechaRobo'
    | 'horaRobo'
    | 'modalidadRobo'
    | 'entidad'
    | 'municipio'
    | 'colonia'
    | 'calle'
    | 'latitud'
    | 'longitud'
    | 'tramo'
    | 'kilometro'
    | 'descHechos'
    | 'cp';

export class PredenunciaRoboValidator {
    static validate(form: PredenunciaRoboFormEntity): ValidationResult<PredenunciaRoboField> {
        const errors: Partial<Record<PredenunciaRoboField, string>> = {};

        if (!form.fechaRobo?.trim()) {
            errors.fechaRobo = 'La fecha del robo es obligatoria.';
        } else if (DateTimeUtils.isFutureDate(form.fechaRobo)) {
            errors.fechaRobo = 'La fecha del robo no puede ser futura.';
        }

        if (!form.horaRobo?.trim()) {
            errors.horaRobo = 'La hora del robo es obligatoria.';
        } else if (DateTimeUtils.isFutureTimeForToday(form.fechaRobo, form.horaRobo)) {
            errors.horaRobo = 'La hora del robo no puede ser futura.';
        }

        if (!form.modalidadRobo?.trim()) {
            errors.modalidadRobo = 'La modalidad del robo es obligatoria.';
        }

        if (!form.entidad?.trim()) {
            errors.entidad = 'La entidad es obligatoria.';
        }

        if (!form.municipio?.trim()) {
            errors.municipio = 'El municipio es obligatorio.';
        }

        if (!form.descHechos?.trim()) {
            errors.descHechos = 'La descripción de los hechos es obligatoria.';
        }

        if (form.lugarTipo === 'urbana') {
            if (!form.colonia?.trim()) {
                errors.colonia = 'La colonia es obligatoria para ubicación urbana.';
            }

            if (!form.calle?.trim()) {
                errors.calle = 'La calle es obligatoria para ubicación urbana.';
            }

            if (form.cp?.trim() && !ValidationPatterns.cp.test(form.cp.trim())) {
                errors.cp = 'El código postal debe tener 5 dígitos.';
            }
        }

        if (form.lugarTipo === 'coordenadas') {
            const lat = Number(form.latitud);
            const lng = Number(form.longitud);

            if (!form.latitud?.trim()) {
                errors.latitud = 'La latitud es obligatoria.';
            } else if (!ValidationPatterns.decimal.test(form.latitud.trim()) || lat < 14 || lat > 33) {
                errors.latitud = 'La latitud debe estar dentro del territorio mexicano.';
            }

            if (!form.longitud?.trim()) {
                errors.longitud = 'La longitud es obligatoria.';
            } else if (!ValidationPatterns.decimal.test(form.longitud.trim()) || lng < -119 || lng > -86) {
                errors.longitud = 'La longitud debe estar dentro del territorio mexicano.';
            }
        }

        if (form.lugarTipo === 'tramo') {
            if (!form.tramo?.trim()) {
                errors.tramo = 'El tramo es obligatorio.';
            }

            if (!form.kilometro?.trim()) {
                errors.kilometro = 'El kilómetro es obligatorio.';
            } else if (!ValidationPatterns.decimal.test(form.kilometro.trim())) {
                errors.kilometro = 'El kilómetro debe ser numérico.';
            }
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    }
}