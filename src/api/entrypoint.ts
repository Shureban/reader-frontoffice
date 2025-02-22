import Auth from "api/sources/auth";
import Users from "api/sources/users";
import http from "api/utils/axios-custom";
import Books from "api/sources/books";

class Entrypoint {

    public auth(): Auth {
        return new Auth(http);
    }

    public users(): Users {
        return new Users(http);
    }

    public books(): Books {
        return new Books(http);
    }
}

export const AuthApi  = new Auth(http)
export const UsersApi = new Users(http)
export const BooksApi = new Books(http)
export default new Entrypoint();
