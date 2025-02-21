import {Tariff} from "api/enums/tariff";
import {OrganizationType} from "api/enums/organization";

export type TLoginRequest = {
    email: string,
    password: string,
}

export type TRegistrationRequest = {
    name: string,
    email: string,
    password: string,
    tariff: Tariff,
    organization_name: string,
    organization_email: string,
    organization_type: OrganizationType,
    organization_account_name: string,
}

export type TConfirmEmailRequest = {
    code: string,
}

export type TForgotPasswordRequest = {
    email: string,
}

export type TResetPasswordRequest = {
    token: string,
    password: string,
    password_confirmation: string,
}
