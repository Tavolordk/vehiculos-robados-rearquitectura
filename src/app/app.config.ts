import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { APP_ENVIRONMENT } from './core/config/app-environment.token';
import { environment } from '../environments/environment';
import { AuthRepository } from './domain/auth/repositories/auth.repository';
import { AuthHttpRepository } from './infrastructure/auth/repositories/auth-http.repository';
import { ConsultaVehiculoRepository } from './domain/consulta-vehiculo/repositories/consulta-vehiculo.repository';
import { ConsultaVehiculoHttpRepository } from './infrastructure/consulta-vehiculo/repositories/consulta-vehiculo-http.repository';
import { CatalogosRepository } from './domain/catalogos/repositories/catalogos.repository';
import { CatalogosRepositoryImpl } from './infrastructure/catalogos/repositories/catalogos.repository.impl';
import { PredenunciaRepository } from './domain/predenuncia/repositories/predenuncia.repository';
import { PredenunciaHttpRepository } from './infrastructure/predenuncia/repositories/predenuncia-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_ENVIRONMENT,
      useValue: {
        apiBaseUrl: environment.apiBaseUrl,
        requestTimeoutMs: 15000,
        enableDebugLogs: true,
      },
    },
    { provide: AuthRepository, useExisting: AuthHttpRepository },
    { provide: ConsultaVehiculoRepository, useExisting: ConsultaVehiculoHttpRepository },
    { provide: CatalogosRepository, useExisting: CatalogosRepositoryImpl },
    { provide: PredenunciaRepository, useExisting: PredenunciaHttpRepository },
  ],
};