export const USER_ROLES = {
    usuario: 'USUARIO',
    enlaceInstitucional: 'ENLACE INSTITUCIONAL',
    supervisor: 'SUPERVISOR',
    administrador: 'ADMINISTRADOR',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];