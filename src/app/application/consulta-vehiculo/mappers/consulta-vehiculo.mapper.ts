import { sanitizeTextInput } from '../../../core/security/input-sanitizer.util';

export interface ConsultaVehiculoFormValue {
    vin: string;
}

export class ConsultaVehiculoFormMapper {
    static normalize(value: Partial<ConsultaVehiculoFormValue>) {
        return {
            vin: sanitizeTextInput(String(value.vin ?? '')).toUpperCase(),
        };
    }
}