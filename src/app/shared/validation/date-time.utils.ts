export class DateTimeUtils {
    static isFutureDate(dateValue: string): boolean {
        const value = String(dateValue ?? '').trim();
        if (!value) return false;

        const parsed = this.parseDate(value);
        if (!parsed) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return parsed.getTime() > today.getTime();
    }

    static isFutureTimeForToday(dateValue: string, timeValue: string): boolean {
        const date = this.parseDate(dateValue);
        if (!date) return false;

        const now = new Date();
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);

        if (date.getTime() !== today.getTime()) return false;

        const [h, m] = String(timeValue ?? '').split(':').map(Number);
        if (!Number.isFinite(h) || !Number.isFinite(m)) return false;

        const selected = new Date(now);
        selected.setHours(h, m, 0, 0);

        return selected.getTime() > now.getTime();
    }

    static parseDate(value: string): Date | null {
        const raw = String(value ?? '').trim();

        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
            const [y, m, d] = raw.split('-').map(Number);
            return new Date(y, m - 1, d);
        }

        const match = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (match) {
            const [, dd, mm, yyyy] = match;
            return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        }

        return null;
    }
}