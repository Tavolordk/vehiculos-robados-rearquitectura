import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/;

export function vinValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = String(control.value ?? '').trim().toUpperCase();

        if (!value) {
            return null;
        }

        return VIN_REGEX.test(value) ? null : { vinInvalido: true };
    };
}