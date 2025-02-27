export type TPage = {
    id: number;
    name: string;
    number: number;
    sentences: string[];
}

export default class PageResource implements TPage {
    public id: number;
    public name: string;
    public number: number;
    public sentences: string[];

    constructor(data: TPage) {
        this.id        = data.id;
        this.name      = data.name;
        this.number    = data.number;
        this.sentences = data.sentences;
    }
};
