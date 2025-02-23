export type TBookProgress = {
    id: number;
}

export default class BookProgressResource implements TBookProgress {
    public id: number;

    constructor(data: TBookProgress) {
        this.id = data.id;
    }
};
