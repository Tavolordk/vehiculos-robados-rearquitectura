import { Observable } from 'rxjs';
import { UserSessionEntity } from '../entities/user-session.entity';

export abstract class AuthRepository {
    abstract login(username: string, password: string): Observable<UserSessionEntity>;

    abstract cambiarPassword(
        cuenta: string,
        passwordActual: string,
        passwordNuevo: string
    ): Observable<{ ok: boolean; mensaje: string }>;
}