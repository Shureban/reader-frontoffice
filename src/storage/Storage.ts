import CookieStorage from "storage/providers/Cookie";

export interface IStorage {
    hasApiToken: () => boolean;
    setApiToken: (token: string) => void;
    getApiToken: () => string;
    dropApiToken: () => void;
}

class Storage implements IStorage {
    instance: IStorage;

    constructor() {
        this.instance = new CookieStorage();
    }

    hasApiToken(): boolean {
        return this.instance.hasApiToken();
    }

    setApiToken(token: string): void {
        this.instance.setApiToken(token);
    }

    getApiToken(): string {
        return this.instance.getApiToken();
    }

    dropApiToken(): void {
        this.instance.dropApiToken();
    }
}

export default new Storage();
