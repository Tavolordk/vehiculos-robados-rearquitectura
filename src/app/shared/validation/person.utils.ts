export class PersonUtils {
    static getBirthDateFromCurp(curp: string): Date | null {
        const normalized = String(curp ?? '').trim().toUpperCase();
        if (normalized.length < 10) return null;

        const year = Number(normalized.substring(4, 6));
        const month = Number(normalized.substring(6, 8));
        const day = Number(normalized.substring(8, 10));

        if (!year || !month || !day) return null;

        const currentYear = new Date().getFullYear() % 100;
        const fullYear = year <= currentYear ? 2000 + year : 1900 + year;

        return new Date(fullYear, month - 1, day);
    }

    static getAge(birthDate: Date): number {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    static isAdultFromCurp(curp: string): boolean {
        const date = this.getBirthDateFromCurp(curp);
        if (!date) return false;
        return this.getAge(date) >= 18;
    }

    static curpRfcMatch(curp: string, rfc: string): boolean {
        const c = String(curp ?? '').trim().toUpperCase();
        const r = String(rfc ?? '').trim().toUpperCase();

        if (!c || !r) return true;

        const curpDate = c.substring(4, 10);
        const rfcDate = r.substring(r.length === 13 ? 4 : 3, r.length === 13 ? 10 : 9);

        return curpDate === rfcDate;
    }
}