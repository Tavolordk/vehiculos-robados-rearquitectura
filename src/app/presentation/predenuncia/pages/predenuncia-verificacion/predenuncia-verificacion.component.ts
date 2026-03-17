import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PredenunciaVerificacionFacade } from '../../../../application/predenuncia/facades/predenuncia-verificacion.facade';
import { PredenunciaRoboState } from '../../../../application/predenuncia/state/predenuncia-robo.state';
import { PredenunciaDenuncianteState } from '../../../../application/predenuncia/state/predenuncia-denunciante.state';
import { PredenunciaVehiculoState } from '../../../../application/predenuncia/state/predenuncia-vehiculo.state';
import { AutoRowEntity } from '../../../../domain/predenuncia/entities/vehiculo.entity';

interface RoboInfo {
    folio: string;
    fechaRobo: string;
    entidad: string;
    municipio: string;
    colonia: string;
    calle: string;
    cp: string;
    modalidad: string;
    horaCaptura: string;
    referencia?: string | null;
    tramo?: string | null;
    kilometro?: string | null;
    latitud?: string | null;
    longitud?: string | null;
}

interface DenuncianteInfo {
    tipoPersona: string;
    nombres: string;
    apellido1: string;
    apellido2: string;
    sexo: string;
    telefono: string;
    rfc: string;
    correo: string;
}

interface VehiculoInfo {
    marca: string;
    submarca: string;
    modelo: string;
    color: string;
    placaPermiso: string;
    serieVin: string;
    nrpv: string;
}

@Component({
    selector: 'app-predenuncia-verificacion',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './predenuncia-verificacion.component.html',
    styleUrls: ['./predenuncia-verificacion.component.scss'],
})
export class PredenunciaVerificacionComponent implements OnInit {
    private readonly facade = inject(PredenunciaVerificacionFacade);
    private readonly roboState = inject(PredenunciaRoboState);
    private readonly denuncianteState = inject(PredenunciaDenuncianteState);
    private readonly vehiculoState = inject(PredenunciaVehiculoState);

    userName = 'Luis Vargas';
    userRole = 'Capturista';

    showRoboModal = false;
    showDenuncianteModal = false;
    showVehiculoModal = false;

    roboEdit: RoboInfo = this.createEmptyRobo();
    denuncianteEdit: DenuncianteInfo = this.createEmptyDenunciante();
    vehiculoEdit: VehiculoInfo = this.createEmptyVehiculo();

    private editingVehiculoIndex: number | null = null;

    ngOnInit(): void {
        this.facade.hydrateFromForms();
    }

    get data() {
        return this.facade.data();
    }

    get loading(): boolean {
        return this.facade.loading();
    }

    get error(): string | null {
        return this.facade.error();
    }

    get folio(): string {
        return this.data?.folio ?? '';
    }

    get fechaRegistro(): string {
        return this.data?.fechaRegistro ?? '';
    }

    get robo(): RoboInfo {
        const robo = this.data?.robo;
        return {
            folio: robo?.folio ?? '',
            fechaRobo: robo?.fechaRobo ?? '',
            entidad: robo?.entidad ?? '',
            municipio: robo?.municipio ?? '',
            colonia: robo?.colonia ?? '',
            calle: robo?.calle ?? '',
            cp: robo?.cp ?? '',
            modalidad: robo?.modalidad ?? '',
            horaCaptura: robo?.horaCaptura ?? '',
            referencia: robo?.referencia ?? '',
            tramo: robo?.tramo ?? '',
            kilometro: robo?.kilometro ?? '',
            latitud: robo?.latitud ?? '',
            longitud: robo?.longitud ?? '',
        };
    }

    get denunciante(): DenuncianteInfo {
        const denunciante = this.data?.denunciante;
        return {
            tipoPersona: denunciante?.tipoPersona ?? '',
            nombres: denunciante?.nombres ?? '',
            apellido1: denunciante?.apellido1 ?? '',
            apellido2: denunciante?.apellido2 ?? '',
            sexo: denunciante?.sexo ?? '',
            telefono: denunciante?.telefono ?? '',
            rfc: denunciante?.rfc ?? '',
            correo: denunciante?.correo ?? '',
        };
    }

    get vehiculos(): VehiculoInfo[] {
        return (this.data?.vehiculos ?? []).map((v) => ({
            marca: v.marca ?? '',
            submarca: v.submarca ?? '',
            modelo: v.modelo ?? '',
            color: v.color ?? '',
            placaPermiso: v.placaPermiso ?? '',
            serieVin: v.serieVin ?? '',
            nrpv: v.nrpv ?? '',
        }));
    }

    private createEmptyRobo(): RoboInfo {
        return {
            folio: '',
            fechaRobo: '',
            entidad: '',
            municipio: '',
            colonia: '',
            calle: '',
            cp: '',
            modalidad: '',
            horaCaptura: '',
            referencia: '',
            tramo: '',
            kilometro: '',
            latitud: '',
            longitud: '',
        };
    }

    private createEmptyDenunciante(): DenuncianteInfo {
        return {
            tipoPersona: '',
            nombres: '',
            apellido1: '',
            apellido2: '',
            sexo: '',
            telefono: '',
            rfc: '',
            correo: '',
        };
    }

    private createEmptyVehiculo(): VehiculoInfo {
        return {
            marca: '',
            submarca: '',
            modelo: '',
            color: '',
            placaPermiso: '',
            serieVin: '',
            nrpv: '',
        };
    }

    private findIdByDescripcion(
        items: Array<{ id: string | number; descripcion: string }>,
        descripcion: string
    ): string {
        const found = items.find(
            (item) =>
                item.descripcion?.trim().toUpperCase() ===
                String(descripcion ?? '').trim().toUpperCase()
        );

        return found ? String(found.id) : '';
    }

    openRoboModal(): void {
        this.roboEdit = { ...this.robo };
        this.showRoboModal = true;
    }

    closeRoboModal(): void {
        this.showRoboModal = false;
    }

    saveRoboModal(): void {
        const entidades = this.roboState.entidades();
        const municipios = this.roboState.municipios();
        const colonias = this.roboState.colonias();
        const modalidades = this.roboState.modalidades();

        const entidadId = this.findIdByDescripcion(entidades, this.roboEdit.entidad);
        const municipioId =
            this.roboEdit.municipio === 'SIN CATÁLOGO DISPONIBLE AÚN'
                ? '-1'
                : this.findIdByDescripcion(municipios, this.roboEdit.municipio);
        const coloniaId =
            this.roboEdit.colonia === 'SIN CATÁLOGO DISPONIBLE AÚN'
                ? '-1'
                : this.findIdByDescripcion(colonias, this.roboEdit.colonia);
        const modalidadId = this.findIdByDescripcion(modalidades, this.roboEdit.modalidad);

        this.roboState.updateForm({
            folio: this.roboEdit.folio,
            fechaRobo: this.roboEdit.fechaRobo,
            entidad: entidadId || this.roboState.form().entidad,
            municipio: municipioId || this.roboState.form().municipio,
            colonia: coloniaId || this.roboState.form().colonia,
            calle: this.roboEdit.calle,
            cp: this.roboEdit.cp,
            modalidadRobo: modalidadId || this.roboState.form().modalidadRobo,
            horaRobo: this.roboEdit.horaCaptura,
            referencia: this.roboEdit.referencia ?? '',
            tramo: this.roboEdit.tramo ?? '',
            kilometro: this.roboEdit.kilometro ?? '',
            latitud: this.roboEdit.latitud ?? '',
            longitud: this.roboEdit.longitud ?? '',
        });

        this.closeRoboModal();
        this.facade.hydrateFromForms();
    }

    openDenuncianteModal(): void {
        this.denuncianteEdit = { ...this.denunciante };
        this.showDenuncianteModal = true;
    }

    closeDenuncianteModal(): void {
        this.showDenuncianteModal = false;
    }

    saveDenuncianteModal(): void {
        const sexos = this.denuncianteState.sexos();

        const sexoId = this.findIdByDescripcion(sexos, this.denuncianteEdit.sexo);
        const tipoPersona =
            this.denuncianteEdit.tipoPersona?.trim().toUpperCase() === 'MORAL'
                ? 'moral'
                : 'fisica';

        this.denuncianteState.updateForm({
            tipoPersona,
            nombreRazonSocial: this.denuncianteEdit.nombres,
            primerApellido: this.denuncianteEdit.apellido1,
            segundoApellido: this.denuncianteEdit.apellido2,
            sexo: sexoId || this.denuncianteState.form().sexo,
            telefono: this.denuncianteEdit.telefono,
            rfc: this.denuncianteEdit.rfc,
            correo: this.denuncianteEdit.correo,
        });

        this.closeDenuncianteModal();
        this.facade.hydrateFromForms();
    }

    openVehiculoModal(index = 0): void {
        const vehiculo = this.vehiculos[index];

        if (!vehiculo) {
            return;
        }

        this.editingVehiculoIndex = index;
        this.vehiculoEdit = { ...vehiculo };
        this.showVehiculoModal = true;
    }

    closeVehiculoModal(): void {
        this.showVehiculoModal = false;
        this.editingVehiculoIndex = null;
    }

    saveVehiculoModal(): void {
        if (this.editingVehiculoIndex !== null) {
            const rows = [...this.vehiculoState.rows()];
            const currentRow = rows[this.editingVehiculoIndex];

            if (currentRow) {
                const updatedRow: AutoRowEntity = {
                    ...currentRow,
                    marcaDescripcion: this.vehiculoEdit.marca,
                    submarcaDescripcion: this.vehiculoEdit.submarca,
                    anio: this.vehiculoEdit.modelo,
                    colorDescripcion: this.vehiculoEdit.color,
                    placa: this.vehiculoEdit.placaPermiso,
                    serieVin: this.vehiculoEdit.serieVin,
                    nrpv: this.vehiculoEdit.nrpv,
                };

                rows[this.editingVehiculoIndex] = updatedRow;
                this.vehiculoState.setRows(rows);
            }
        }

        this.closeVehiculoModal();
        this.facade.hydrateFromForms();
    }

    onGuardar(): void {
        this.facade.onGuardar();
    }

    onLogout(): void {
        console.log('Cerrar sesión');
    }
}