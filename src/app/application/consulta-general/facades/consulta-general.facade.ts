import { Injectable, inject } from '@angular/core';
import { ConsultaGeneralState, SearchType } from '../state/consulta-general.state';
import { ConsultaGeneralRowEntity } from '../../../domain/consulta-general/entities/consulta-general-row.entity';
import { DetalleModalDataEntity } from '../../../domain/consulta-general/entities/modal-detalle-consulta.entity';
import { DetalleConsultaEntity } from '../../../domain/consulta-vehiculo/entities/detalle-consulta.entity';

@Injectable({ providedIn: 'root' })
export class ConsultaGeneralFacade {
    private readonly state = inject(ConsultaGeneralState);

    readonly searchType = this.state.searchType;
    readonly fechaDel = this.state.fechaDel;
    readonly fechaAl = this.state.fechaAl;
    readonly folioPredenuncia = this.state.folioPredenuncia;
    readonly placaPermiso = this.state.placaPermiso;
    readonly serieVin = this.state.serieVin;
    readonly nrpv = this.state.nrpv;
    readonly averiguacionPrevia = this.state.averiguacionPrevia;
    readonly noMotor = this.state.noMotor;
    readonly fuenteInfo = this.state.fuenteInfo;
    readonly entidadRobo = this.state.entidadRobo;
    readonly municipio = this.state.municipio;
    readonly marca = this.state.marca;
    readonly submarca = this.state.submarca;
    readonly modelo = this.state.modelo;
    readonly validationMsg = this.state.validationMsg;
    readonly rows = this.state.rows;

    private readonly MAX_RANGE_MONTHS = 12;
    private readonly MIN_HISTORICAL_DATE: Date | null = null;

    setSearchType(value: SearchType): void { this.state.setSearchType(value); }
    setFechaDel(value: string): void { this.state.setFechaDel(value); }
    setFechaAl(value: string): void { this.state.setFechaAl(value); }
    setFolioPredenuncia(value: string): void { this.state.setFolioPredenuncia(value); }
    setPlacaPermiso(value: string): void { this.state.setPlacaPermiso(value); }
    setSerieVin(value: string): void { this.state.setSerieVin(value); }
    setNrpv(value: string): void { this.state.setNrpv(value); }
    setAveriguacionPrevia(value: string): void { this.state.setAveriguacionPrevia(value); }
    setNoMotor(value: string): void { this.state.setNoMotor(value); }
    setFuenteInfo(value: string): void { this.state.setFuenteInfo(value); }
    setEntidadRobo(value: string): void { this.state.setEntidadRobo(value); }
    setMunicipio(value: string): void { this.state.setMunicipio(value); }
    setMarca(value: string): void { this.state.setMarca(value); }
    setSubmarca(value: string): void { this.state.setSubmarca(value); }
    setModelo(value: string): void { this.state.setModelo(value); }

    clear(): void {
        this.state.clear();
    }

    hasAnyCriteria(): boolean {
        const text = (s: string) => (s || '').trim().length > 0;

        const hasDateAny = text(this.state.fechaDel()) || text(this.state.fechaAl());

        return (
            hasDateAny ||
            text(this.state.folioPredenuncia()) ||
            text(this.state.placaPermiso()) ||
            text(this.state.serieVin()) ||
            text(this.state.nrpv()) ||
            text(this.state.averiguacionPrevia()) ||
            text(this.state.noMotor()) ||
            text(this.state.entidadRobo()) ||
            text(this.state.municipio()) ||
            text(this.state.fuenteInfo()) ||
            text(this.state.marca()) ||
            text(this.state.submarca()) ||
            text(this.state.modelo())
        );
    }

    private countCriteriaFilled(): number {
        const text = (s: string) => (s || '').trim().length > 0;
        let count = 0;

        const hasDateAny = text(this.state.fechaDel()) || text(this.state.fechaAl());
        if (hasDateAny) count++;

        if (text(this.state.folioPredenuncia())) count++;
        if (text(this.state.placaPermiso())) count++;
        if (text(this.state.serieVin())) count++;
        if (text(this.state.nrpv())) count++;
        if (text(this.state.averiguacionPrevia())) count++;
        if (text(this.state.noMotor())) count++;
        if (text(this.state.entidadRobo())) count++;
        if (text(this.state.municipio())) count++;
        if (text(this.state.fuenteInfo())) count++;
        if (text(this.state.marca())) count++;
        if (text(this.state.submarca())) count++;
        if (text(this.state.modelo())) count++;

        return count;
    }

    private isAllowedSingleCriterion(): boolean {
        const text = (s: string) => (s || '').trim().length > 0;

        return (
            text(this.state.folioPredenuncia()) ||
            text(this.state.placaPermiso()) ||
            text(this.state.serieVin()) ||
            text(this.state.nrpv()) ||
            text(this.state.averiguacionPrevia())
        );
    }

    private parseDateInput(value: string): Date | null {
        const v = (value || '').trim();
        if (!v) return null;

        const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
        if (iso) {
            const yyyy = Number(iso[1]);
            const mm = Number(iso[2]);
            const dd = Number(iso[3]);

            const d = new Date(yyyy, mm - 1, dd);
            if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd) {
                return null;
            }
            return d;
        }

        const mx = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
        if (mx) {
            const dd = Number(mx[1]);
            const mm = Number(mx[2]);
            const yyyy = Number(mx[3]);

            const d = new Date(yyyy, mm - 1, dd);
            if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd) {
                return null;
            }
            return d;
        }

        return null;
    }

    private monthsBetween(a: Date, b: Date): number {
        return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
    }

    private validateDateRange(): string | null {
        const delStr = (this.state.fechaDel() || '').trim();
        const alStr = (this.state.fechaAl() || '').trim();

        const usedAny = !!delStr || !!alStr;
        if (!usedAny) return null;

        if (!delStr || !alStr) {
            return 'Para realizar la búsqueda, es necesario capturar la fecha inicial y la fecha final.';
        }

        const del = this.parseDateInput(delStr);
        const al = this.parseDateInput(alStr);
        if (!del || !al) {
            return 'El formato de fecha ingresado no es válido. Por favor, utilice el formato DD/MM/AAAA.';
        }

        if (del.getTime() > al.getTime()) {
            return 'La fecha inicial no puede ser mayor que la fecha final. Verifique el rango seleccionado.';
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const del0 = new Date(del);
        del0.setHours(0, 0, 0, 0);
        const al0 = new Date(al);
        al0.setHours(0, 0, 0, 0);

        if (del0.getTime() > today.getTime() || al0.getTime() > today.getTime()) {
            return 'Las fechas seleccionadas no pueden ser posteriores a la fecha actual. Ingrese un rango válido.';
        }

        const months = this.monthsBetween(del0, al0);
        if (months > this.MAX_RANGE_MONTHS) {
            return 'El rango de fechas seleccionado excede el límite permitido para consulta. Ajuste las fechas e intente nuevamente.';
        }

        if (this.MIN_HISTORICAL_DATE) {
            const min = new Date(this.MIN_HISTORICAL_DATE);
            min.setHours(0, 0, 0, 0);

            if (del0.getTime() < min.getTime() || al0.getTime() < min.getTime()) {
                return 'El rango solicitado incluye fechas que no se encuentran dentro del periodo habilitado para consulta.';
            }
        }

        return null;
    }

    search(): boolean {
        this.state.setValidationMsg('');

        const count = this.countCriteriaFilled();
        if (count === 0) {
            this.state.setValidationMsg(
                'Para realizar la búsqueda, es necesario capturar al menos un criterio de búsqueda.'
            );
            return false;
        }

        if (count === 1 && !this.isAllowedSingleCriterion()) {
            this.state.setValidationMsg(
                'Para realizar la búsqueda, es necesario seleccionar un criterio más.'
            );
            return false;
        }

        const dateErr = this.validateDateRange();
        if (dateErr) {
            this.state.setValidationMsg(dateErr);
            return false;
        }

        return true;
    }

    isPredenuncia(estatus: string): boolean {
        return (estatus || '').trim().toUpperCase() === 'PREDENUNCIA';
    }

    buildPredenunciaData(row: ConsultaGeneralRowEntity): DetalleConsultaEntity {
        return {
            robo: {
                folio: '626317',
                fechaRobo: row.fechaRobo,
                horaCaptura: '11:32 a. m.',
                entidad: row.entidad,
                municipio: 'NEZAHUALCOYOTL',
                colonia: 'BENITO JUAREZ',
                calle: 'SORJUANA 200',
                cp: '57000',
                referencia: 'NULL',
                tramo: '',
                kilometro: '',
                latitud: '',
                longitud: '',
                modalidad: 'SIN VIOLENCIA',
            },
            denunciante: {
                tipoPersona: 'FISICA',
                nombres: 'ALBERTO',
                apellido1: 'DIAZ',
                apellido2: 'OSORIO',
                sexo: 'MASCULINO',
                telefono: '55 21 12 43 45',
                rfc: '0019201230',
                correo: 'israelado@gmail.com',
            },
            vehiculos: [
                {
                    marca: row.marca,
                    submarca: row.submarca,
                    modelo: '2000',
                    color: 'Negro',
                    placaPermiso: row.placa,
                    serieVin: row.serie,
                    nrpv: '3O5C3ADC',
                },
            ],
        };
    }

    buildDenunciaData(row: ConsultaGeneralRowEntity): DetalleModalDataEntity {
        return {
            infoRobo: {
                folio: '626317',
                fechaRobo: row.fechaRobo,
                horaCaptura: '11:32 a. m.',
                entidad: row.entidad,
                municipio: 'NEZAHUALCOYOTL',
                colonia: 'BENITO JUAREZ',
                calle: 'SORJUANA 200',
                cp: '57000',
                referencia: 'NULL',
                tramo: '',
                kilometro: '',
                latitud: '',
                longitud: '',
            },
            denunciante: {
                tipoPersona: 'FISICA',
                nombres: 'ALBERTO',
                primerApellido: 'DIAZ',
                segundoApellido: 'OSORIO',
                sexo: 'MASCULINO',
                telefono: '55 21 12 43 45',
                rfc: '0019201230',
                correo: 'israelado@gmail.com',
            },
            modus: {
                modalidad: 'CON VIOLENCIA',
                victimas: '1',
                presuntos: '2',
                tipoLugar: 'VIA PUBLICA',
                seHacePasarPor: 'LLJ888A',
                peculiaridades: 'ENCAPUCHADOS',
                senas: 'ENCAPUCHADOS',
                vestimenta: 'NEGRA',
                comportamiento: 'AGRESIVO',
                armas: 'ARMA DE FUEGO',
                delitos: 'ROBO',
            },
            averiguacion: {
                numero: row.averiguacion || '—',
                agencia: 'AGENCIA DEL MINISTERIO PÚBLICO CUH-8',
                agente: 'AGENCIA DEL MINISTERIO PÚBLICO CUH',
            },
            vehiculosAsociados: [
                { marca: 'Nissan', submarca: 'Tsuru', color: 'Azul', placa: '-----' },
                { marca: 'Chevrolet', submarca: 'Captiva', color: 'Rojo', placa: '-----' },
                { marca: 'KIA', submarca: 'Tucson', color: 'Gris', placa: '-----' },
            ],
            vehiculos: [
                {
                    marca: row.marca,
                    submarca: row.submarca,
                    modelo: '2000',
                    color: 'Negro',
                    placaPermiso: row.placa,
                    serieVin: row.serie,
                    nrpv: '3O5C3ADC',
                },
            ],
        };
    }
}