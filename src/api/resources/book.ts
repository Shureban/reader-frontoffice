import {TFile} from "api/resources/file";

export type TBook = {
    id: number;
    name: string;
    author: string;
    cover_file_id: number;
    cover_file?: TFile;
}

export default class BookResource implements TBook {
    public id: number;
    public name: string;
    public author: string;
    public cover_file_id: number;
    public cover_file?: TFile;

    constructor(data: TBook) {
        this.id            = data.id;
        this.name          = data.name;
        this.author        = data.author;
        this.cover_file_id = data.cover_file_id;
        this.cover_file    = data.cover_file;
    }
};
