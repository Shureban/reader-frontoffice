export type TAuthor = {
    id: number;
    name: string;
    url_slug: string;
}

export default class AuthorResource implements TAuthor {
    public id: number;
    public name: string;
    public url_slug: string;

    constructor(data: TAuthor) {
        this.id       = data.id;
        this.name     = data.name;
        this.url_slug = data.url_slug;
    }
};
