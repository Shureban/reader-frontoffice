export type TUser = {
    id: number;
    email: string;
    is_verified: boolean;
}

export default class UserResource implements TUser {
    public id: number;
    public email: string;
    public is_verified: boolean;

    constructor(data: TUser) {
        this.id          = data.id;
        this.email       = data.email;
        this.is_verified = data.is_verified;
    }

    public isVerified    = () => this.is_verified;
    public isNotVerified = () => !this.isVerified();
};
