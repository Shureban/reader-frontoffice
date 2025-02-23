import {TBook} from "api/resources/book";

export type TBookProgress = {
    uuid: string;
    book: TBook;
}

export default class BookProgressResource implements TBookProgress {
    public uuid: string;
    public book: TBook;

    constructor(data: TBookProgress) {
        this.uuid = data.uuid;
        this.book = data.book;
    }
};
