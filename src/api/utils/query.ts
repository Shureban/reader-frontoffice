export const objectToQueryString = (object: Record<string, any>): string => {
    return Object.keys(object)
        .filter(key => {
            const value = object[key];
            return value !== undefined && value !== null && value !== '';
        })
        .map(key => {
            const value = object[key];

            if (Array.isArray(value)) {
                return value.map(val => `${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`).join('&');
            }

            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .filter(part => part !== '')
        .join('&');
}
