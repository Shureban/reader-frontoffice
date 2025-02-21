import Auth from "api/sources/auth";
import Users from "api/sources/users";
import http from "api/utils/axios-custom";

class Entrypoint {

    public auth(): Auth {
        return new Auth(http);
    }

    public users(): Users {
        return new Users(http);
    }
}

export const AuthApi  = new Auth(http)
export const UsersApi = new Users(http)
export default new Entrypoint();
