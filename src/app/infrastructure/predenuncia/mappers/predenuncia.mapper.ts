import {
    ConsultarPredenunciaResponseEntity,
    ConsultarPredenunciaVehiculoResponseEntity,
    CrearPredenunciaRequestEntity,
    CrearPredenunciaResponseEntity,
    PredenunciaVehiculoRequestEntity,
} from '../../../domain/predenuncia/entities/predenuncia-api.entity';
import {
    ConsultarPredenunciaResponseDto,
    ConsultarPredenunciaVehiculoResponseDto,
    CrearPredenunciaRequestDto,
    CrearPredenunciaResponseDto,
    PredenunciaVehiculoRequestDto,
} from '../dtos/predenuncia.dto';
import { PredenunciaDenuncianteFormEntity } from '../../../domain/predenuncia/entities/predenuncia-denunciante.entity';
import { PredenunciaRoboFormEntity } from '../../../domain/predenuncia/entities/predenuncia-robo.entity';
import { AutoRowEntity, PredenunciaVehiculoFormEntity } from '../../../domain/predenuncia/entities/vehiculo.entity';
import { PredenunciaVerificacionEntity } from '../../../domain/predenuncia/entities/predenuncia-verificacion.entity';

export class PredenunciaMapper {
    static toCrearRequestDto(entity: CrearPredenunciaRequestEntity): CrearPredenunciaRequestDto {
        return {
            ...entity,
            vehiculos: entity.vehiculos?.map(this.toVehiculoRequestDto) ?? [],
        };
    }

    static toCrearResponseEntity(dto: CrearPredenunciaResponseDto): CrearPredenunciaResponseEntity {
        return {
            reporteId: dto?.reporteId ?? null,
            folio: dto?.folio ?? null,
            codigo: dto?.codigo ?? 0,
            mensaje: dto?.mensaje ?? null,
        };
    }

    static toConsultarResponseEntity(
        dto: ConsultarPredenunciaResponseDto | null | undefined
    ): ConsultarPredenunciaResponseEntity {
        return {
            vehiculos: (dto?.vehiculos ?? []).map(this.toConsultarVehiculoEntity),
        };
    }

    static toVerificacionEntityFromForms(params: {
        folio?: string | null;
        fechaRegistro?: string | null;
        roboForm: PredenunciaRoboFormEntity;
        denuncianteForm: PredenunciaDenuncianteFormEntity;
        vehiculoForm: PredenunciaVehiculoFormEntity;
        vehiculos: AutoRowEntity[];
    }): PredenunciaVerificacionEntity {
        const {
            folio,
            fechaRegistro,
            roboForm,
            denuncianteForm,
            vehiculos,
        } = params;

        return {
            folio: folio ?? roboForm.folio ?? denuncianteForm.folio ?? '',
            fechaRegistro:
                fechaRegistro ?? roboForm.fechaRegistro ?? denuncianteForm.fechaRegistro ?? '',
            robo: {
                folio: folio ?? roboForm.folio ?? '',
                fechaRobo: roboForm.fechaRobo ?? '',
                entidad: roboForm.entidad ?? '',
                municipio: roboForm.municipio ?? '',
                colonia: roboForm.colonia ?? '',
                calle: roboForm.calle ?? '',
                cp: roboForm.cp ?? '',
                modalidad: roboForm.modalidadRobo ?? '',
                horaCaptura: roboForm.horaRobo ?? '',
                referencia: roboForm.referencia ?? '',
                tramo: roboForm.tramo ?? '',
                kilometro: roboForm.kilometro ?? '',
                latitud: roboForm.latitud ?? '',
                longitud: roboForm.longitud ?? '',
            },
            denunciante: {
                tipoPersona: denuncianteForm.tipoPersona ?? '',
                nombres: denuncianteForm.nombreRazonSocial ?? '',
                apellido1: denuncianteForm.primerApellido ?? '',
                apellido2: denuncianteForm.segundoApellido ?? '',
                sexo: denuncianteForm.sexo ?? '',
                telefono: denuncianteForm.telefono ?? '',
                rfc: denuncianteForm.rfc ?? '',
                correo: denuncianteForm.correo ?? '',
            },
            vehiculos: vehiculos.map((item) => ({
                marca: item.marca ?? '',
                submarca: item.submarca ?? '',
                modelo: item.anio ?? '',
                color: item.color ?? '',
                placaPermiso: item.placa ?? '',
                serieVin: '',
                nrpv: '',
            })),
        };
    }

    static buildCrearRequestFromForms(params: {
        roboForm: PredenunciaRoboFormEntity;
        denuncianteForm: PredenunciaDenuncianteFormEntity;
        vehiculoForm: PredenunciaVehiculoFormEntity;
        vehiculos: AutoRowEntity[];
        usuarioId?: number;
        entidadId?: number;
        tzUsuario?: string;
        tipoVehiculoId?: number | null;
        tipoUsoId?: number | null;
    }): CrearPredenunciaRequestEntity {
        const {
            roboForm,
            denuncianteForm,
            vehiculoForm,
            vehiculos,
            usuarioId = 1,
            entidadId,
            tzUsuario = 'America/Mexico_City',
            tipoVehiculoId = null,
            tipoUsoId = null,
        } = params;

        const modoUbicacionMap: Record<string, number> = {
            urbana: 1,
            coordenadas: 2,
            tramo: 3,
        };

        const denTipoPersonaId = denuncianteForm.tipoPersona === 'moral' ? 2 : 1;

        const fechaRoboIso = this.toIsoDateTime(
            roboForm.fechaRobo,
            roboForm.horaRobo || '00:00'
        );

        const rows = vehiculos.length > 0
            ? vehiculos
            : [{
                marca: vehiculoForm.marca,
                submarca: vehiculoForm.submarca,
                anio: vehiculoForm.modelo,
                color: vehiculoForm.color,
                placa: vehiculoForm.placa,
            }];

        return {
            usuarioId,
            entidadId: entidadId ?? this.toNumber(roboForm.entidad) ?? 0,
            tzUsuario,

            denCurp: this.toNullString(denuncianteForm.curp),
            denRfc: this.toNullString(denuncianteForm.rfc),
            denNombres: this.toNullString(denuncianteForm.nombreRazonSocial),
            denPrimerAp: this.toNullString(denuncianteForm.primerApellido),
            denSegundoAp: this.toNullString(denuncianteForm.segundoApellido),
            denFechaNac: null,
            denTelefono: this.toNullString(denuncianteForm.telefono),
            denCorreo: this.toNullString(denuncianteForm.correo),
            denTipoPersonaId,
            denSexoId: this.toNumber(denuncianteForm.sexo),

            denDomEntidadId: null,
            denDomMunicipioId: null,
            denDomLocalidadId: null,
            denDomColoniaId: null,
            denDomCp: null,
            denDomCalle: null,
            denDomNumExt: null,
            denDomNumInt: null,
            denDomReferencia: null,

            fechaRobo: fechaRoboIso,
            horaRobo: this.toTimeSpan(roboForm.horaRobo),
            descHechos: roboForm.descHechos,
            modalidadRoboId: this.toNumber(roboForm.modalidadRobo) ?? 0,

            ubicModoId: modoUbicacionMap[roboForm.lugarTipo] ?? 1,
            ubicEntidadId: this.toNumber(roboForm.entidad),
            ubicMunicipioId: this.toNumber(roboForm.municipio),
            ubicLocalidadId: null,
            ubicColoniaId: this.toNumber(roboForm.colonia),
            ubicCp: this.toNullString(roboForm.cp),
            ubicCalle: this.toNullString(roboForm.calle),
            ubicNumExt: this.toNullString(roboForm.numExt),
            ubicNumInt: this.toNullString(roboForm.numInt),
            ubicReferencia: this.toNullString(roboForm.referencia),
            ubicLatitud: this.toNullableFloat(roboForm.latitud),
            ubicLongitud: this.toNullableFloat(roboForm.longitud),
            ubicTramo: this.toNullString(roboForm.tramo),
            ubicKm: this.toNullableFloat(roboForm.kilometro),

            vehiculos: rows.map((item, index) => {
                const isOnlyFormVehicle =
                    vehiculos.length === 0 &&
                    index === 0 &&
                    !!vehiculoForm.placa;

                return {
                    placa: this.toNullString(isOnlyFormVehicle ? vehiculoForm.placa : item.placa),
                    niv: this.toNullString(isOnlyFormVehicle ? vehiculoForm.serieVin : null),
                    motor: null,
                    nrpv: this.toNullString(isOnlyFormVehicle ? vehiculoForm.nrpv : null),
                    lineaId: this.toNumber(isOnlyFormVehicle ? vehiculoForm.submarca : null),
                    modeloAnio: this.toNumber(isOnlyFormVehicle ? vehiculoForm.modelo : item.anio),
                    color: this.toNullString(isOnlyFormVehicle ? vehiculoForm.color : item.color),
                    tipoVehiculoId,
                    tipoUsoId,
                    entidadPlacaId: this.toNumber(
                        isOnlyFormVehicle ? vehiculoForm.procedenciaPlaca || vehiculoForm.entidad : null
                    ),
                    permiso: this.toNullString(isOnlyFormVehicle ? vehiculoForm.permiso : null),
                    senas: this.toNullString(isOnlyFormVehicle ? vehiculoForm.senas : null),
                    esPrincipal: index === 0,
                };
            }),
        };
    }

    private static toVehiculoRequestDto(
        entity: PredenunciaVehiculoRequestEntity
    ): PredenunciaVehiculoRequestDto {
        return { ...entity };
    }

    private static toConsultarVehiculoEntity(
        dto: ConsultarPredenunciaVehiculoResponseDto
    ): ConsultarPredenunciaVehiculoResponseEntity {
        return {
            reporteVehiculoId: dto?.reporteVehiculoId ?? null,
            esPrincipal: dto?.esPrincipal ?? null,
            vehiculoId: dto?.vehiculoId ?? null,
            placa: dto?.placa ?? null,
            niv: dto?.niv ?? null,
            motor: dto?.motor ?? null,
            nrpv: dto?.nrpv ?? null,
            modeloAnio: dto?.modeloAnio ?? null,
            color: dto?.color ?? null,
            lineaId: dto?.lineaId ?? null,
            lineaNombre: dto?.lineaNombre ?? null,
            lineaNivel: dto?.lineaNivel ?? null,
            submarcaId: dto?.submarcaId ?? null,
            submarcaNombre: dto?.submarcaNombre ?? null,
            marcaId: dto?.marcaId ?? null,
            marcaNombre: dto?.marcaNombre ?? null,
            tipoVehiculoId: dto?.tipoVehiculoId ?? null,
            tipoVehiculoNombre: dto?.tipoVehiculoNombre ?? null,
            tipoUsoId: dto?.tipoUsoId ?? null,
            tipoUsoNombre: dto?.tipoUsoNombre ?? null,
            entidadPlacaId: dto?.entidadPlacaId ?? null,
            entidadPlacaNombre: dto?.entidadPlacaNombre ?? null,
            permiso: dto?.permiso ?? null,
            senasParticulares: dto?.senasParticulares ?? null,
        };
    }

    private static toNumber(value: string | number | null | undefined): number | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    private static toNullableFloat(value: string | number | null | undefined): number | null {
        return this.toNumber(value);
    }

    private static toNullString(value: string | null | undefined): string | null {
        const normalized = String(value ?? '').trim();
        return normalized.length ? normalized : null;
    }

    private static toTimeSpan(value: string | null | undefined): string | null {
        const normalized = String(value ?? '').trim();
        return normalized.length ? `${normalized}:00` : null;
    }

    private static toIsoDateTime(
        dateValue: string | null | undefined,
        timeValue: string | null | undefined
    ): string {
        const rawDate = String(dateValue ?? '').trim();
        const rawTime = String(timeValue ?? '00:00').trim() || '00:00';

        if (!rawDate) {
            return new Date().toISOString();
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
            return `${rawDate}T${rawTime}:00`;
        }

        const ddmmyyyy = rawDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (ddmmyyyy) {
            const [, dd, mm, yyyy] = ddmmyyyy;
            return `${yyyy}-${mm}-${dd}T${rawTime}:00`;
        }

        return new Date().toISOString();
    }
}