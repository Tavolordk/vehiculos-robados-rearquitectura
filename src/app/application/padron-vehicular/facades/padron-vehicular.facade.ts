import { Injectable, inject } from '@angular/core';
import { PadronVehicularState } from '../state/padron-vehicular.state';
import { PadronRowEntity } from '../../../domain/padron-vehicular/entities/padron-row.entity';
import { PadronConsultaResultadoEntity } from '../../../domain/padron-vehicular/entities/consulta-resultado.entity';

@Injectable({ providedIn: 'root' })
export class PadronVehicularFacade {
    private readonly state = inject(PadronVehicularState);

    private readonly submarcasMap: Record<string, string[]> = {
        NISSAN: ['TSURU', 'VERSA', 'SENTRA'],
        CHEVROLET: ['CAPTIVA', 'AVEO', 'SPARK'],
        KIA: ['TUCSON', 'RIO', 'FORTE'],
        ITALIKA: ['ITALIKA'],
        BAJAJ: ['PULSAR N', 'DOMINAR'],
    };

    readonly propNombre = this.state.propNombre;
    readonly propApellido1 = this.state.propApellido1;
    readonly propApellido2 = this.state.propApellido2;
    readonly serieNiv = this.state.serieNiv;
    readonly placa = this.state.placa;
    readonly motor = this.state.motor;
    readonly marca = this.state.marca;
    readonly submarca = this.state.submarca;
    readonly modelo = this.state.modelo;
    readonly tipoVehiculo = this.state.tipoVehiculo;
    readonly entidad = this.state.entidad;
    readonly nrpv = this.state.nrpv;
    readonly rfv = this.state.rfv;

    readonly marcas = this.state.marcas;
    readonly submarcas = this.state.submarcas;
    readonly modelos = this.state.modelos;
    readonly tiposVehiculo = this.state.tiposVehiculo;
    readonly entidades = this.state.entidades;

    readonly rows = this.state.rows;
    readonly page = this.state.page;
    readonly totalPages = this.state.totalPages;
    readonly pages = this.state.pages;

    setPropNombre(value: string): void { this.state.setPropNombre(value); }
    setPropApellido1(value: string): void { this.state.setPropApellido1(value); }
    setPropApellido2(value: string): void { this.state.setPropApellido2(value); }
    setSerieNiv(value: string): void { this.state.setSerieNiv(value); }
    setPlaca(value: string): void { this.state.setPlaca(value); }
    setMotor(value: string): void { this.state.setMotor(value); }
    setMarca(value: string): void { this.state.setMarca(value); }
    setSubmarca(value: string): void { this.state.setSubmarca(value); }
    setModelo(value: string): void { this.state.setModelo(value); }
    setTipoVehiculo(value: string): void { this.state.setTipoVehiculo(value); }
    setEntidad(value: string): void { this.state.setEntidad(value); }
    setNrpv(value: string): void { this.state.setNrpv(value); }
    setRfv(value: string): void { this.state.setRfv(value); }

    onMarcaChange(): void {
        const marca = this.state.marca();
        const submarcas = marca ? this.submarcasMap[marca] || [] : [];
        this.state.setSubmarcas(submarcas);

        if (this.state.submarca() && !submarcas.includes(this.state.submarca())) {
            this.state.setSubmarca('');
        }
    }

    hasAnyCriteria(): boolean {
        const t = (s: string) => (s || '').trim().length > 0;

        return (
            t(this.state.propNombre()) ||
            t(this.state.propApellido1()) ||
            t(this.state.propApellido2()) ||
            t(this.state.serieNiv()) ||
            t(this.state.placa()) ||
            t(this.state.motor()) ||
            t(this.state.marca()) ||
            t(this.state.submarca()) ||
            t(this.state.modelo()) ||
            t(this.state.tipoVehiculo()) ||
            t(this.state.entidad()) ||
            t(this.state.nrpv()) ||
            t(this.state.rfv())
        );
    }

    clear(): void {
        this.state.resetForm();
    }

    search(): void {
        const t = (s: string) => (s || '').trim().toUpperCase();

        const fNombre = t(this.state.propNombre());
        const fAp1 = t(this.state.propApellido1());
        const fAp2 = t(this.state.propApellido2());

        const fSerie = t(this.state.serieNiv());
        const fPlaca = t(this.state.placa());
        const fMotor = t(this.state.motor());
        const fMarca = t(this.state.marca());
        const fSubmarca = t(this.state.submarca());
        const fModelo = t(this.state.modelo());

        const filtered = this.state.allRows().filter((r) => {
            if (fSerie && !t(r.serie).includes(fSerie)) return false;
            if (fMotor && !t(r.motor).includes(fMotor)) return false;
            if (fMarca && t(r.marca) !== fMarca) return false;
            if (fSubmarca && t(r.submarca) !== fSubmarca) return false;
            if (fModelo && t(r.anioModelo) !== fModelo) return false;

            if (fNombre || fAp1 || fAp2) {
                // demo
            }
            if (fPlaca) {
                // demo
            }

            return true;
        });

        this.state.setRows(filtered);
        this.state.setPage(1);
    }

    buildModalData(row: PadronRowEntity): PadronConsultaResultadoEntity {
        return {
            propietario: {
                nombres: this.state.propNombre() || 'GABRIEL',
                apellidoPaterno: this.state.propApellido1() || 'GUTIERREZ',
                apellidoMaterno: this.state.propApellido2() || 'PEREZ',
                calleNumero: '7 ORIENTE, 1816, A',
                cp: '72501',
                colonia: 'AZCARATE',
                entidad: this.state.entidad() || 'PUEBLA',
                municipio: '',
            },
            vehiculo: {
                entidad: this.state.entidad() || '',
                marca: row.marca,
                submarca: row.submarca,
                anioModelo: row.anioModelo || '',
                color: 'NEGRO',
                motor: row.motor,
                serieNiv: row.serie,
                nrpv: this.state.nrpv() || '',
                rfv: this.state.rfv() || '',
            },
        };
    }

    goToPage(p: number): void {
        if (p < 1 || p > this.state.totalPages()) return;
        this.state.setPage(p);
    }

    prevPage(): void {
        if (this.state.page() > 1) {
            this.state.setPage(this.state.page() - 1);
        }
    }

    nextPage(): void {
        if (this.state.page() < this.state.totalPages()) {
            this.state.setPage(this.state.page() + 1);
        }
    }
}