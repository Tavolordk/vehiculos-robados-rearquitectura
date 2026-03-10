import { UserSessionEntity } from '../../../domain/auth/entities/user-session.entity';
import { LoginResponseDto } from '../dtos/login-response.dto';

export class AuthMapper {
    static toUserSession(dto: LoginResponseDto): UserSessionEntity {
        return {
            success: dto.success,
            userId: dto.userId,
            tipoUsuario: dto.tipoUsuario,
            correo: dto.correo,
            nombre: dto.nombre,
            primerApellido: dto.primerApellido,
            segundoApellido: dto.segundoApellido,
            entidadNacimiento: dto.entidadNacimiento,
            code: dto.code,
            message: dto.message,
        };
    }
}