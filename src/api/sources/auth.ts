import {ApiRoute} from "api/routes";
import {TConfirmEmailRequest, TForgotPasswordRequest, TLoginRequest, TRegistrationRequest, TResetPasswordRequest} from "api/requests/auth";
import {TLoginResponse, TRegistrationResponse} from "api/responses/auth";
import Source from "api/sources/source";

export default class Auth extends Source {

    public login(request: TLoginRequest): Promise<TLoginResponse> {
        return this.client.post(ApiRoute.AuthLogin, request)
            .then((response: TLoginResponse) => response);
    }

    public registration(request: TRegistrationRequest): Promise<TRegistrationResponse> {
        return this.client.post(ApiRoute.AuthRegistration, request)
            .then((response: TRegistrationResponse) => response);
    }

    public confirmEmail(request: TConfirmEmailRequest): Promise<any> {
        return this.client.post(ApiRoute.AuthConfirmEmail, request);
    }

    public resendConfirmationEmail(): Promise<any> {
        return this.client.post(ApiRoute.AuthConfirmEmailResend);
    }

    public forgotPassword(request: TForgotPasswordRequest): Promise<any> {
        return this.client.post(ApiRoute.AuthForgotPassword, request);
    }

    public resetPassword(request: TResetPasswordRequest): Promise<any> {
        return this.client.post(ApiRoute.AuthResetPassword, request);
    }
}
