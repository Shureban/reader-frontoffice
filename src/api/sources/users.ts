import {ApiRoute} from "api/routes";
import UserResource from "api/resources/user";
import {TUsersMeResponse, TUsersSettingsResponse} from "api/responses/users";
import Source from "api/sources/source";
import {TUpdateUserSettingsRequest} from "api/requests/users";
import UserSettingsResource from "api/resources/user-settings";

export default class Users extends Source {

    public async me(): Promise<UserResource> {
        return this.client.get(ApiRoute.UsersMe)
            .then((response: TUsersMeResponse) => new UserResource(response.data.data));
    }

    public async updateSettings(request: TUpdateUserSettingsRequest): Promise<UserSettingsResource> {
        return this.client.put(ApiRoute.UsersUpdateSettings, request)
            .then((response: TUsersSettingsResponse) => new UserSettingsResource(response.data.data));
    }
}
