import { VehiculoEntity } from '../../../domain/consulta-vehiculo/entities/vehiculo.entity';
import { ConsultaVehiculoResponseDto } from '../dtos/consulta-vehiculo-response.dto';

export class ConsultaVehiculoMapper {
    static toEntity(dto: ConsultaVehiculoResponseDto): VehiculoEntity {
        return {
            vin: String(dto.vin ?? '').trim().toUpperCase(),
            placa: dto.placa ?? null,
            numeroMotor: dto.numeroMotor ?? null,
            marca: dto.marca ?? null,
            submarca: dto.submarca ?? null,
            modelo: dto.modelo ?? null,
            color: dto.color ?? null,
            estatus: dto.estatus ?? null,
            fechaReporte: dto.fechaReporte ?? null,
            autoridad: dto.autoridad ?? null,
            averiguacionPrevia: dto.averiguacionPrevia ?? null,
            propietario: dto.propietario ?? null,
            observaciones: dto.observaciones ?? null,
        };
    }
}