import { Routes } from '@angular/router';
import { AuthShellComponent } from './presentation/layouts/auth-shell/auth-shell.component';
import { MainShellComponent } from './presentation/layouts/main-shell/main-shell.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthShellComponent,
        loadChildren: () =>
            import('./presentation/features/auth/routes/auth.routes').then((m) => m.AUTH_ROUTES),
    },
    {
        path: '',
        component: MainShellComponent,
        children: [
            {
                path: 'vehiculos',
                loadChildren: () =>
                    import('./presentation/features/consulta-general/routes/consulta-general.routes').then(
                        (m) => m.CONSULTA_GENERAL_ROUTES
                    ),
            },
            {
                path: 'padron-vehicular',
                loadChildren: () =>
                    import('./presentation/features/padron-vehicular/routes/padron-vehicular.routes').then(
                        (m) => m.PADRON_VEHICULAR_ROUTES
                    ),
            },
            {
                path: 'consulta-vehiculo',
                loadChildren: () =>
                    import('./presentation/features/consulta-vehiculo/routes/consulta-vehiculo.routes').then(
                        (m) => m.CONSULTA_VEHICULO_ROUTES
                    ),
            }, {
                path: 'predenuncia/vehiculo',
                loadComponent: () =>
                    import('./presentation/predenuncia/pages/predenuncia-vehiculo/predenuncia-vehiculo.component')
                        .then(m => m.PredenunciaVehiculoComponent)
            }, {
                path: 'predenuncia/robo',
                loadComponent: () =>
                    import('./presentation/predenuncia/pages/predenuncia-robo/predenuncia-robo.component')
                        .then((m) => m.PredenunciaRoboComponent),
            }, {
                path: 'predenuncia/denunciante',
                loadComponent: () =>
                    import('./presentation/predenuncia/pages/predenuncia-denunciante/predenuncia-denunciante.component')
                        .then((m) => m.PredenunciaDenuncianteComponent),
            }, {
                path: 'predenuncia/verificacion',
                loadComponent: () =>
                    import('./presentation/predenuncia/pages/predenuncia-verificacion/predenuncia-verificacion.component')
                        .then((m) => m.PredenunciaVerificacionComponent),
            }, {
                path: 'denuncia/vehiculo',
                loadComponent: () =>
                    import('./presentation/denuncia/pages/denuncia-vehiculo/denuncia-vehiculo.component')
                        .then((m) => m.DenunciaVehiculoComponent),
            }, {
                path: 'denuncia/robo',
                loadComponent: () =>
                    import('./presentation/denuncia/pages/denuncia-robo/denuncia-robo.component')
                        .then((m) => m.DenunciaRoboComponent),
            }, {
                path: 'denuncia/denunciante',
                loadComponent: () =>
                    import('./presentation/denuncia/pages/denuncia-denunciante/denuncia-denunciante.component')
                        .then((m) => m.DenunciaDenuncianteComponent),
            }, {
                path: 'denuncia/modus-operandi',
                loadComponent: () =>
                    import('./presentation/denuncia/pages/denuncia-modus-operandi/denuncia-modus-operandi.component')
                        .then((m) => m.DenunciaModusOperandiComponent),
            }, {
                path: 'denuncia/verificacion',
                loadComponent: () =>
                    import('./presentation/denuncia/pages/denuncia-verificacion/denuncia-verificacion.component')
                        .then((m) => m.DenunciaVerificacionComponent),
            }, {
                path: 'admin/configuracion-reportes',
                loadComponent: () =>
                    import('./presentation/administracion/pages/configuracion-reportes/configuracion-reportes.component')
                        .then((m) => m.ConfiguracionReportesComponent),
            }, {
                path: 'admin/recuperacion/info',
                loadComponent: () =>
                    import('./presentation/administracion/pages/recuperacion-info/recuperacion-info.component')
                        .then((m) => m.AdminRecuperacionInfoComponent),
            }, {
                path: 'admin/recuperacion/vehiculo',
                loadComponent: () =>
                    import('./presentation/administracion/pages/recuperacion-vehiculo/recuperacion-vehiculo.component')
                        .then((m) => m.AdminRecuperacionVehiculoComponent),
            }, {
                path: 'admin/recuperacion/ficha-criminogena',
                loadComponent: () =>
                    import('./presentation/administracion/pages/recuperacion-ficha-criminogena/recuperacion-ficha-criminogena.component')
                        .then((m) => m.RecuperacionFichaCriminogenaComponent),
            }, {
                path: 'admin/recuperacion/verificacion',
                loadComponent: () =>
                    import('./presentation/administracion/pages/recuperacion-verificacion/recuperacion-verificacion.component')
                        .then((m) => m.RecuperacionVerificacionComponent),
            }, {
                path: 'admin/entrega/vehiculo',
                loadComponent: () =>
                    import('./presentation/administracion/pages/entrega-vehiculo/entrega-vehiculo.component')
                        .then((m) => m.EntregaVehiculoComponent),
            }, {
                path: 'admin/entrega/inspeccion-ministerial',
                loadComponent: () =>
                    import('./presentation/administracion/pages/inspeccion-ministerial/inspeccion-ministerial.component')
                        .then((m) => m.InspeccionMinisterialComponent),
            },
            {
                path: '',
                redirectTo: 'vehiculos',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    },
];