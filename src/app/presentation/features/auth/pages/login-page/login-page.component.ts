import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthFacade } from '../../../../../application/auth/facades/auth.facade';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    openSeguimiento = false;
    captchaUrl =
        'https://replicate.delivery/xezq/lxuhCZNOgsZdKBPtPk9dfC8OgGAEyhMANaY1gSROeKnYmQnVA/out-0.png';

    private readonly fb = inject(FormBuilder);
    private readonly authFacade = inject(AuthFacade);

    faEye = faEye;
    faEyeSlash = faEyeSlash;

    hidePassword = true;
    mensajeError: string | null = null;

    readonly isLoading = this.authFacade.isLoading;
    readonly error = this.authFacade.error;

    loginForm = this.fb.group({
        usuario: ['', Validators.required],
        contrasena: ['', Validators.required],
    });

    ngOnInit(): void { }

    abrirSeguimiento(e?: Event): void {
        if (e) e.preventDefault();
        this.openSeguimiento = true;
    }

    cerrarSeguimiento(): void {
        this.openSeguimiento = false;
    }

    togglePassword(): void {
        this.hidePassword = !this.hidePassword;
    }

    iniciarSesion(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            this.mensajeError = 'Usuario y contraseña son requeridos.';
            return;
        }

        const { usuario, contrasena } = this.loginForm.getRawValue();

        const username = String(usuario ?? '').trim();
        const password = String(contrasena ?? '');

        this.mensajeError = null;
        this.authFacade.clearError();

        this.authFacade.login(username, password).subscribe({
            next: () => {
                const error = this.error();
                if (error) {
                    this.mensajeError = error;
                }
            },
            error: (e: any) => {
                this.mensajeError = e?.message ?? 'No se pudo iniciar sesión.';
            },
        });
    }

    get loading(): boolean {
        return this.isLoading();
    }

    get usuarioCtrl() {
        return this.loginForm.get('usuario');
    }

    get contrasenaCtrl() {
        return this.loginForm.get('contrasena');
    }
}