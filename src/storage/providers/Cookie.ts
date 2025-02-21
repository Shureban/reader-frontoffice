import {IStorage} from "storage/Storage";
import Cookies from "universal-cookie";

const ApiTokenKey = "api_token";

class CookieStorage implements IStorage {
    private cookies: Cookies;

    constructor() {
        this.cookies = new Cookies();
    }

    hasApiToken(): boolean {
        return !!this.getApiToken();
    }

    getApiToken(): string {
        return this.cookies.get(ApiTokenKey);
    }

    setApiToken(apiToken: string): void {
        this.cookies.set(ApiTokenKey, apiToken, {
            path: "/",
            domain: window.location.hostname,
        });
    }

    dropApiToken(): void {
        this.cookies.remove(ApiTokenKey, {
            path: "/",
            domain: window.location.hostname,
        });
    }
}

export default CookieStorage;
