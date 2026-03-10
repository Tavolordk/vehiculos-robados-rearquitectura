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
                path: 'consulta-vehiculo',
                loadChildren: () =>
                    import('./presentation/features/consulta-vehiculo/routes/consulta-vehiculo.routes').then(
                        (m) => m.CONSULTA_VEHICULO_ROUTES
                    ),
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