import {TBook} from "api/resources/book";
import {TPage} from "api/resources/page";

export type TBookProgress = {
    uuid: string;
    book: TBook;
    page: TPage;
    sentence_number: number;
}

export default class BookProgressResource implements TBookProgress {
    public uuid: string;
    public book: TBook;
    public page: TPage;
    public sentence_number: number;

    constructor(data: TBookProgress) {
        this.uuid            = data.uuid;
        this.book            = data.book;
        this.page            = data.page;
        this.sentence_number = data.sentence_number;
    }
};
