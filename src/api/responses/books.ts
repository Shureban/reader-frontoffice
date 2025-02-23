import {PaginationResponseData} from "api/responses/base";
import {TBook} from "api/resources/book";

export type TBooksListResponse = {
    data: TBook[];
    pagination: PaginationResponseData;
};

export type TBookResponse = {
    data: {
        data: TBook;
    };
};
