export type TLoginRequest = {
    email: string,
    password: string,
}

export type TRegistrationRequest = {
    email: string,
    password: string,
    password_confirmation: string,
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
