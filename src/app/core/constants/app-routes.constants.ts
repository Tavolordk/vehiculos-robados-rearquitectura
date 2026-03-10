export const APP_ROUTES = {
    auth: {
        root: '/auth',
        login: '/auth/login',
        actualizarPassword: '/auth/actualizar-password',
    },
    consultaVehiculo: '/consulta-vehiculo',
    misRegistros: '/mis-registros',
    dashboard: '/dashboard',
    padron: '/padron-vehicular',
    predenuncia: '/predenuncia/vehiculo',
    denuncia: '/denuncia/vehiculo',
    recuperacion: '/admin/recuperacion/info',
    entrega: '/admin/entrega/vehiculo',
} as const;