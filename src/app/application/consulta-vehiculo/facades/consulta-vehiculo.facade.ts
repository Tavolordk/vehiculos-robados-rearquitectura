import { Injectable, inject } from '@angular/core';
import { ConsultaVehiculoState } from '../state/consulta-vehiculo.state';
import { VinResultEntity } from '../../../domain/consulta-vehiculo/entities/vin-result.entity';

@Injectable({ providedIn: 'root' })
export class ConsultaVehiculoFacade {
    private readonly state = inject(ConsultaVehiculoState);

    readonly vin = this.state.vin;
    readonly loading = this.state.loading;
    readonly errorMsg = this.state.errorMsg;
    readonly result = this.state.result;
    readonly hasResult = this.state.hasResult;

    setVin(value: string): void {
        this.state.setVin(value);
    }

    canSearch(): boolean {
        return (this.state.vin() || '').trim().length >= 6;
    }

    clear(): void {
        this.state.clear();
    }

    /**
     * Modo migración visual:
     * conserva la lógica demo del proyecto actual
     * mientras se conecta API real después
     */
    searchDemo(): void {
        this.state.setErrorMsg('');
        this.state.setResult(null);

        const vin = (this.state.vin() || '').trim().toUpperCase();

        if (!vin) {
            this.state.setErrorMsg('Capture un NIV/VIN.');
            return;
        }

        if (vin.length < 10) {
            this.state.setErrorMsg('No se encontró información para el VIN capturado (demo).');
            return;
        }

        const result: VinResultEntity = {
            vin,
            clase: 'Automóvil',
            marca: 'NISSAN',
            modelo: 'TIDA',
            anioModelo: '2013',
            tipo: 'Sedan',
            puertas: '4 Puertas',
            paisOrigen: 'México',
            cilindrada: '1.8 L',
            cilindros: 'L4',
            plantaEnsamble: 'Civac, Cuernavaca Morelos, México',
            complemento:
                'Sedan 4 puertas cint. 3 puntos s/airbags civac Cuernavaca, Morelos, México MR16 1.8 L, 14',
        };

        this.state.setResult(result);
    }

    buildDetalleDemo() {
        return {
            robo: {
                folio: 'PD-2026-000123',
                fechaRobo: '10/03/2026',
                horaCaptura: '15:40',
                entidad: 'Ciudad de México',
                municipio: 'Cuauhtémoc',
                colonia: 'Centro',
                calle: 'Av. Juárez',
                cp: '06000',
                referencia: 'A una cuadra del monumento',
                tramo: 'N/A',
                kilometro: 'N/A',
                latitud: '19.4352',
                longitud: '-99.1412',
                modalidad: 'Con violencia',
            },
            denunciante: {
                tipoPersona: 'Física',
                nombres: 'Juan Carlos',
                apellido1: 'Pérez',
                apellido2: 'López',
                sexo: 'Masculino',
                telefono: '5512345678',
                rfc: 'PELJ850101XXX',
                correo: 'juan.perez@email.com',
            },
            vehiculos: [
                {
                    marca: 'NISSAN',
                    submarca: 'TIDA',
                    modelo: '2013',
                    color: 'Gris',
                    placaPermiso: 'ABC1234',
                    serieVin: this.state.result()?.vin || '',
                    nrpv: 'NRPV-0012345',
                },
            ],
        };
    }

    buildResultadoModalDemo() {
        return {
            propietario: {
                nombres: 'Juan Carlos',
                apellidoPaterno: 'Pérez',
                apellidoMaterno: 'López',
                calleNumero: 'Av. Juárez 120',
                cp: '06000',
                colonia: 'Centro',
                entidad: 'Ciudad de México',
                municipio: 'Cuauhtémoc',
            },
            vehiculo: {
                entidad: 'Ciudad de México',
                marca: 'NISSAN',
                submarca: 'TIDA',
                anioModelo: '2013',
                color: 'Gris',
                motor: 'MR16',
                serieNiv: this.state.result()?.vin || '',
                nrpv: 'NRPV-0012345',
                rfv: 'RFV-998877',
            },
        };
    }
}