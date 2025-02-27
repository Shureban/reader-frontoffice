import {ApiRoute} from "api/routes";
import Source from "api/sources/source";
import {PaginationResponseData} from "api/responses/base";
import {objectToQueryString} from "api/utils/query";
import {AxiosResponse} from "axios";
import {TBooksPagesListRequest} from "api/requests/book-pages";
import PageResource, {TPage} from "api/resources/page";
import {TBooksPagesListResponse} from "api/responses/books-pages";

export default class BookPages extends Source {

    public async list(authorSlug: string, bookSlug: string, request: TBooksPagesListRequest): Promise<TBooksPagesListResponse> {
        return this.client.get(ApiRoute.BookPagesList.replace(':authorSlug', authorSlug).replace(':bookSlug', bookSlug) + '?' + objectToQueryString(request))
            .then(({data}: AxiosResponse) => ({
                data: data.data.map((page: TPage) => new PageResource(page)),
                pagination: data as PaginationResponseData,
            }));
    }
}
