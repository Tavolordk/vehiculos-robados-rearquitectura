export class Normalizers {
    static trim(value: string | null | undefined): string {
        return String(value ?? '').trim();
    }

    static upper(value: string | null | undefined): string {
        return this.trim(value).toUpperCase();
    }

    static collapseSpaces(value: string | null | undefined): string {
        return this.trim(value).replace(/\s+/g, ' ');
    }

    static upperCollapse(value: string | null | undefined): string {
        return this.collapseSpaces(value).toUpperCase();
    }

    static numeric(value: string | null | undefined): string {
        return String(value ?? '').replace(/\D+/g, '');
    }

    static email(value: string | null | undefined): string {
        return this.collapseSpaces(value).toLowerCase();
    }
}