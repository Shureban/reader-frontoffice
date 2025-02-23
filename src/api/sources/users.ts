import {ApiRoute} from "api/routes";
import UserResource from "api/resources/user";
import {TUsersMeResponse} from "api/responses/users";
import Source from "api/sources/source";

export default class Users extends Source {

    public async me(): Promise<UserResource> {
        return this.client.get(ApiRoute.UsersMe)
            .then((response: TUsersMeResponse) => new UserResource(response.data.data));
    }
}
