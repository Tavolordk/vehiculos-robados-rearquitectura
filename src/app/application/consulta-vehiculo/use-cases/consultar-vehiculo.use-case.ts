import { Injectable, inject } from '@angular/core';
import { ConsultaVehiculoState } from '../state/consulta-vehiculo.state';
import { VinResultEntity } from '../../../domain/consulta-vehiculo/entities/vin-result.entity';

@Injectable({ providedIn: 'root' })
export class ConsultarVehiculoUseCase {
    private readonly state = inject(ConsultaVehiculoState);

    execute(vin: string): void {
        this.state.setLoading(true);
        this.state.setErrorMsg('');
        this.state.setResult(null);

        const normalizedVin = String(vin ?? '').trim().toUpperCase();

        if (!normalizedVin) {
            this.state.setLoading(false);
            this.state.setErrorMsg('Capture un NIV/VIN.');
            return;
        }

        if (normalizedVin.length < 10) {
            this.state.setLoading(false);
            this.state.setErrorMsg('No se encontró información para el VIN capturado (demo).');
            return;
        }

        const result: VinResultEntity = {
            vin: normalizedVin,
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
        this.state.setLoading(false);
    }
}