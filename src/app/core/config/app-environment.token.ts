import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
    apiBaseUrl: string;
    requestTimeoutMs: number;
    enableDebugLogs: boolean;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');