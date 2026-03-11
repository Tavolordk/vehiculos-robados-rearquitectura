import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DenunciaModusOperandiFacade } from '../../../../application/denuncia/facades/denuncia-modus-operandi.facade';
import { ModalidadRoboEntity } from '../../../../domain/denuncia/entities/denuncia-modus-operandi.entity';

@Component({
    selector: 'app-denuncia-modus-operandi',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './denuncia-modus-operandi.component.html',
    styleUrls: ['./denuncia-modus-operandi.component.scss'],
})
export class DenunciaModusOperandiComponent {
    private readonly facade = inject(DenunciaModusOperandiFacade);

    get form() {
        return this.facade.form();
    }

    get folio(): string {
        return this.form.folio;
    }

    get fechaRegistro(): string {
        return this.form.fechaRegistro;
    }

    get modalidad(): ModalidadRoboEntity {
        return this.form.modalidad;
    }
    set modalidad(value: ModalidadRoboEntity) {
        this.facade.setModalidad(value);
    }

    get victimas(): string {
        return this.form.victimas;
    }
    set victimas(value: string) {
        this.facade.updateField('victimas', value);
    }

    get presuntos(): string {
        return this.form.presuntos;
    }
    set presuntos(value: string) {
        this.facade.updateField('presuntos', value);
    }

    get tipoLugar(): string {
        return this.form.tipoLugar;
    }
    set tipoLugar(value: string) {
        this.facade.updateField('tipoLugar', value);
    }

    get seHizoPasarPor(): string {
        return this.form.seHizoPasarPor;
    }
    set seHizoPasarPor(value: string) {
        this.facade.updateField('seHizoPasarPor', value);
    }

    get vestimenta(): string {
        return this.form.vestimenta;
    }
    set vestimenta(value: string) {
        this.facade.updateField('vestimenta', value);
    }

    get peculiaridades(): string {
        return this.form.peculiaridades;
    }
    set peculiaridades(value: string) {
        this.facade.updateField('peculiaridades', value);
    }

    get senasParticulares(): string {
        return this.form.senasParticulares;
    }
    set senasParticulares(value: string) {
        this.facade.updateField('senasParticulares', value);
    }

    get comportamiento(): string {
        return this.form.comportamiento;
    }
    set comportamiento(value: string) {
        this.facade.updateField('comportamiento', value);
    }

    get armas() {
        return this.form.armas;
    }

    get delitos() {
        return this.form.delitos;
    }

    get marca(): string {
        return this.form.marca;
    }
    set marca(value: string) {
        this.facade.updateField('marca', value);
    }

    get submarca(): string {
        return this.form.submarca;
    }
    set submarca(value: string) {
        this.facade.updateField('submarca', value);
    }

    get color(): string {
        return this.form.color;
    }
    set color(value: string) {
        this.facade.updateField('color', value);
    }

    get placa(): string {
        return this.form.placa;
    }
    set placa(value: string) {
        this.facade.updateField('placa', value);
    }

    get observaciones(): string {
        return this.form.observaciones;
    }
    set observaciones(value: string) {
        this.facade.updateField('observaciones', value);
    }

    get maxObs(): number {
        return this.form.maxObs;
    }

    get asociados() {
        return this.form.asociados;
    }

    updateArma(field: string, value: boolean): void {
        this.facade.updateArma(field, value);
    }

    updateDelito(field: string, value: boolean): void {
        this.facade.updateDelito(field, value);
    }

    onAgregarAuto(): void {
        this.facade.onAgregarAuto();
    }

    onEliminarAuto(index: number): void {
        this.facade.onEliminarAuto(index);
    }

    onSiguiente(): void {
        this.facade.onSiguiente();
    }
}
