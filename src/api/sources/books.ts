import {ApiRoute} from "api/routes";
import Source from "api/sources/source";
import {PaginationResponseData} from "api/responses/base";
import {TBooksListRequest} from "api/requests/books";
import {TBooksListResponse} from "api/responses/books";
import {objectToQueryString} from "api/utils/query";
import {AxiosResponse} from "axios";
import BookResource, {TBook} from "api/resources/book";

export default class Books extends Source {

    public async list(request: TBooksListRequest): Promise<TBooksListResponse> {
        return this.client.get(ApiRoute.BooksList + '?' + objectToQueryString(request))
            .then(({data}: AxiosResponse) => ({
                data: data.data.map((book: TBook) => new BookResource(book)),
                pagination: data as PaginationResponseData,
            }));
    }
}
