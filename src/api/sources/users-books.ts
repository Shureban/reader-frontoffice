import {ApiRoute} from "api/routes";
import Source from "api/sources/source";
import {TBooksProgressListRequest, TGetProgressRequest, TStartBookReadingRequest} from "api/requests/users-books";
import {objectToQueryString} from "api/utils/query";
import BookProgressResource, {TBookProgress} from "api/resources/book-progress";
import {TBookProgressResponse, TBooksProgressListResponse} from "api/responses/users-books";
import {AxiosResponse} from "axios";
import {PaginationResponseData} from "api/responses/base";

export default class UsersBooks extends Source {

    public async list(request: TBooksProgressListRequest): Promise<TBooksProgressListResponse> {
        return this.client.get(ApiRoute.UsersBooksProgressList + '?' + objectToQueryString(request))
            .then(({data}: AxiosResponse) => ({
                data: data.data.map((book: TBookProgress) => new BookProgressResource(book)),
                pagination: data as PaginationResponseData,
            }));
    }

    public async show(uuid: string): Promise<BookProgressResource> {
        return this.client.get(ApiRoute.UsersBooksShowBookProgress.replace(':uuid', uuid))
            .then((response: TBookProgressResponse) => new BookProgressResource(response.data.data));
    }

    public async getBookProgress(request: TGetProgressRequest): Promise<BookProgressResource> {
        return this.client.get(ApiRoute.UsersBooksGetBookProgress + '?' + objectToQueryString(request))
            .then((response: TBookProgressResponse) => new BookProgressResource(response.data.data));
    }

    public async startReading(request: TStartBookReadingRequest): Promise<BookProgressResource> {
        return this.client.post(ApiRoute.UsersBooksStartReadingProgress, request)
            .then((response: TBookProgressResponse) => new BookProgressResource(response.data.data));
    }
}
