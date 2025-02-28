import {TUserSettings} from "api/resources/user-settings";

export type TUser = {
    id: number;
    email: string;
    is_verified: boolean;
    settings: TUserSettings;
}

export default class UserResource implements TUser {
    public id: number;
    public email: string;
    public is_verified: boolean;
    public settings: TUserSettings;

    constructor(data: TUser) {
        this.id          = data.id;
        this.email       = data.email;
        this.is_verified = data.is_verified;
        this.settings    = data.settings;
    }

    public isVerified    = () => this.is_verified;
    public isNotVerified = () => !this.isVerified();
};
