export function buildApiUrl(baseUrl: string, path: string): string {
    const normalizedBase = (baseUrl || '').replace(/\/+$/, '');
    const normalizedPath = (path || '').replace(/^\/+/, '');

    if (!normalizedBase) {
        throw new Error('API base URL no configurada.');
    }

    if (!normalizedPath) {
        throw new Error('Path de API no configurado.');
    }

    return `${normalizedBase}/${normalizedPath}`;
}