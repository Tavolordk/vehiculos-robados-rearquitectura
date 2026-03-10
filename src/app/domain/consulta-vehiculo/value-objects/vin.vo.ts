export class VinVO {
    private static readonly VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/;

    static normalize(value: string): string {
        return String(value ?? '').trim().toUpperCase();
    }

    static isValid(value: string): boolean {
        return this.VIN_REGEX.test(this.normalize(value));
    }
}