import { Injectable, signal } from '@angular/core';
import { EntregaVerificacionPageEntity } from '../../../domain/administracion/entities/entrega-verificacion.entity';

@Injectable({ providedIn: 'root' })
export class EntregaVerificacionState {
    private readonly _data = signal<EntregaVerificacionPageEntity>({
        pageTitle: 'Vehículos Robados y Recuperados',
        subHeader: 'Entrega',
        usuarioNombre: 'Luis Vargas',
        usuarioRol: 'Capturista',
        folio: '626317',
        fechaHoraRegistro: '25/08/2025 11:32 a.m.',
        entregaVehiculo: {
            carpetaInvestigacion: 'ASDASASDAQQW234234',
            folioDenuncia: 'OAX/VRYR/30082025/7509169',
            fechaDenuncia: '19/09/2016',
            horaDenuncia: '11:32 a. m.',
            fechaRobo: '12/05/2016',
            horaRobo: '01:01',
            fechaRecuperacion: '09/01/2018',
            horaRecuperacion: '01:01',
            serie: 'LTMPCG677G5808856',
            placa: null,
        },
        infoEntrega: {
            fechaEntrega: '01/12/1970',
            horaEntrega: '11:32 a. m.',
            calleNumero: 'Calle principal',
            referencia: 'Frente a el OXXXO',
            colonia: 'Ixtaltepec',
            municipio: 'Asunción Ixtaltepec',
            entidad: 'Oaxaca',
            cp: '70140',
        },
        inspeccion: {
            ministerial: true,
            porcentajeRecuperacion: 80,
            valorUnidad: '95000 m.n',
        },
        alteraciones: {
            serieAlterada: '1BKH528Y3WF133',
            motorAlterado: 'LC162FMKQQ358',
        },
        observaciones:
            'El vehículo se entrega con un 80% de recuperación, conforme a la inspección ministerial realizada; se detecta alteración en los números de motor y chasis, manteniendo condiciones generales aceptables para su entrega.',
        docPropietario: {
            tipoPersona: 'Propietario',
            nombres: 'Jorge',
            primerApellido: 'Cruz',
            segundoApellido: 'Díaz',
            credencialElector: 'XXXX000000H00X0',
            pasaporte: 'G12345678',
            cedulaProfesional: '654321',
            comprobanteDomicilio: 'Recibo de CFE',
            otroDocumento: 'Cartilla: 1234567890',
        },
    });

    readonly data = this._data.asReadonly();
}