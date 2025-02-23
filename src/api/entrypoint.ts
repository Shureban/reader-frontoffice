import Auth from "api/sources/auth";
import Users from "api/sources/users";
import http from "api/utils/axios-custom";
import Books from "api/sources/books";
import UsersBooks from "api/sources/users-books";

export const AuthApi       = new Auth(http)
export const UsersApi      = new Users(http)
export const BooksApi      = new Books(http)
export const UsersBooksApi = new UsersBooks(http)
