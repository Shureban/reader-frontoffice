import {ApiRoute} from "api/routes";
import Source from "api/sources/source";
import {TGetProgressRequest, TStartBookReadingRequest} from "api/requests/users-books";
import {objectToQueryString} from "api/utils/query";
import BookProgressResource from "api/resources/book-progress";
import {TBookProgressResponse} from "api/responses/users-books";

export default class UsersBooks extends Source {

    public async getProgress(request: TGetProgressRequest): Promise<BookProgressResource> {
        return this.client.get(ApiRoute.UsersBooksGetProgress + '?' + objectToQueryString(request))
            .then((response: TBookProgressResponse) => new BookProgressResource(response.data.data));
    }

    public async startReading(request: TStartBookReadingRequest): Promise<BookProgressResource> {
        return this.client.post(ApiRoute.UsersBooksStartReadingProgress, request)
            .then((response: TBookProgressResponse) => new BookProgressResource(response.data.data));
    }
}
