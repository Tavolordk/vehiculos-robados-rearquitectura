import { PredenunciaDenuncianteFormEntity } from '../../../domain/predenuncia/entities/predenuncia-denunciante.entity';
import { ValidationResult } from '../../../shared/validation/validation.models';
import { ValidationPatterns } from '../../../shared/validation/validation.patterns';
import { PersonUtils } from '../../../shared/validation/person.utils';

export type PredenunciaDenuncianteField =
    | 'nombreRazonSocial'
    | 'primerApellido'
    | 'curp'
    | 'rfc'
    | 'sexo'
    | 'telefono'
    | 'correo';

export class PredenunciaDenuncianteValidator {
    static validate(form: PredenunciaDenuncianteFormEntity): ValidationResult<PredenunciaDenuncianteField> {
        const errors: Partial<Record<PredenunciaDenuncianteField, string>> = {};

        if (!form.nombreRazonSocial?.trim()) {
            errors.nombreRazonSocial = 'El nombre o razón social es obligatorio.';
        }

        if (form.tipoPersona === 'fisica' && !form.primerApellido?.trim()) {
            errors.primerApellido = 'El primer apellido es obligatorio.';
        }

        if (form.curp?.trim()) {
            const curp = form.curp.trim().toUpperCase();

            if (!ValidationPatterns.curp.test(curp)) {
                errors.curp = 'El CURP no tiene un formato válido.';
            } else if (!PersonUtils.isAdultFromCurp(curp)) {
                errors.curp = 'No se puede registrar a una persona menor de edad.';
            }
        }

        if (!form.rfc?.trim()) {
            errors.rfc = 'El RFC es obligatorio.';
        } else {
            const rfc = form.rfc.trim().toUpperCase();
            const isValidRfc =
                form.tipoPersona === 'moral'
                    ? ValidationPatterns.rfcMoral.test(rfc)
                    : ValidationPatterns.rfcFisica.test(rfc);

            if (!isValidRfc) {
                errors.rfc = 'El RFC no tiene un formato válido.';
            }
        }

        if (form.tipoPersona === 'fisica' && !form.sexo?.trim()) {
            errors.sexo = 'El sexo es obligatorio.';
        }

        if (form.telefono?.trim() && !ValidationPatterns.phone10.test(form.telefono.trim())) {
            errors.telefono = 'Ingrese un número telefónico válido de 10 dígitos.';
        }

        if (form.correo?.trim() && !ValidationPatterns.email.test(form.correo.trim().toLowerCase())) {
            errors.correo = 'El correo electrónico no tiene un formato válido.';
        }

        if (form.curp?.trim() && form.rfc?.trim() && !PersonUtils.curpRfcMatch(form.curp, form.rfc)) {
            errors.rfc = 'El CURP y el RFC no corresponden a la misma persona.';
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    }
}