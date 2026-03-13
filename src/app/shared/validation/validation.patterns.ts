export const ValidationPatterns = {
    phone10: /^[0-9]{10}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    curp: /^[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM][A-Z]{5}[A-Z0-9][0-9]$/,
    rfcFisica: /^[A-ZÑ&]{4}[0-9]{6}[A-Z0-9]{3}$/,
    rfcMoral: /^[A-ZÑ&]{3}[0-9]{6}[A-Z0-9]{3}$/,
    vin: /^[A-HJ-NPR-Z0-9]{17}$/,
    plate: /^[A-Z0-9-]{5,10}$/,
    cp: /^[0-9]{5}$/,
    integer: /^[0-9]+$/,
    decimal: /^-?\d+(\.\d+)?$/,
};