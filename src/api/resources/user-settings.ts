export type TUserSettings = {
    words_per_minute: number;
    font_size: number;
}

export default class UserSettingsResource implements TUserSettings {
    public words_per_minute: number;
    public font_size: number;

    constructor(data: TUserSettings) {
        this.words_per_minute = data.words_per_minute;
        this.font_size        = data.font_size;
    }
};
