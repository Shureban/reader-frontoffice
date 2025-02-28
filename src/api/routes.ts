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
    UsersUpdateSettings              = '/users/settings',

    BooksList                        = '/books',
    BookInfoList                     = '/books/:authorSlug/:bookSlug',

    BookPagesList                    = '/books/:authorSlug/:bookSlug/pages',

    UsersBooksProgressList           = '/users/books',
    UsersBooksShowBookProgress       = '/users/books/progress/:uuid',
    UsersBooksGetBookProgress        = '/users/books/progress',
    UsersBooksStartReadingProgress   = '/users/books/progress',
    UsersBooksUpdateProgress         = '/users/books/progress',
}
