export interface UserSessionEntity {
    success: number;
    userId: number | null;
    tipoUsuario: string | null;
    correo: string | null;
    nombre: string | null;
    primerApellido: string | null;
    segundoApellido: string | null;
    entidadNacimiento: string | null;
    code: string | null;
    message: string | null;
}