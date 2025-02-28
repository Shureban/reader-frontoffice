import {TUser} from "api/resources/user";
import {TUserSettings} from "api/resources/user-settings";

export type TUsersMeResponse = {
    data: {
        data: TUser;
    }
}

export type TUsersSettingsResponse = {
    data: {
        data: TUserSettings;
    }
}
