class Env {
    constructor() {
    }

    public getApiDomain(): string {
        return import.meta.env.VITE_API_DOMAIN || "";
    }
}

export default new Env();