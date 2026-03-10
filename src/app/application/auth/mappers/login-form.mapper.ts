export interface LoginFormValue {
    usuario: string;
    contrasena: string;
}

export class LoginFormMapper {
    static normalize(value: Partial<LoginFormValue>) {
        return {
            usuario: String(value.usuario ?? '').trim(),
            contrasena: String(value.contrasena ?? ''),
        };
    }
}