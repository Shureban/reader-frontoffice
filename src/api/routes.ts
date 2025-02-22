export enum ApiRoute {
    AuthLogin                        = '/auth/login',
    AuthRegistration                 = '/auth/registration',
    AuthRegistrationCheckEmail       = '/auth/registration/check/email',
    AuthRegistrationCheckAccountName = '/auth/registration/check/account-name',
    AuthConfirmEmail                 = '/auth/confirm-email',
    AuthConfirmEmailResend           = '/auth/confirm-email/resend',
    AuthForgotPassword               = '/auth/forgot-password',
    AuthResetPassword                = '/auth/reset-password',

    UsersMe                          = '/users/me',

    BooksList                        = '/books',
}
