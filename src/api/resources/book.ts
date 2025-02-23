import {TFile} from "api/resources/file";
import AuthorResource from "api/resources/author";

export type TBook = {
    id: number;
    name: string;
    description: string;
    url_slug: string;
    author: AuthorResource;
    cover_file_id: number;
    cover_file?: TFile;
}

export default class BookResource implements TBook {
    public id: number;
    public name: string;
    public description: string;
    public url_slug: string;
    public author: AuthorResource;
    public cover_file_id: number;
    public cover_file?: TFile;

    constructor(data: TBook) {
        this.id            = data.id;
        this.name          = data.name;
        this.description   = data.description;
        this.url_slug      = data.url_slug;
        this.author        = data.author;
        this.cover_file_id = data.cover_file_id;
        this.cover_file    = data.cover_file;
    }
};
