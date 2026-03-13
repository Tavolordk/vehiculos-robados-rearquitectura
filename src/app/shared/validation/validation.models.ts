export type ValidationErrors<T extends string = string> = Partial<Record<T, string>>;

export interface ValidationResult<T extends string = string> {
    valid: boolean;
    errors: ValidationErrors<T>;
}