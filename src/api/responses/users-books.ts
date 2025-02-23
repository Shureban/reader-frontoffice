import {TBookProgress} from "api/resources/book-progress";
import {PaginationResponseData} from "api/responses/base";

export type TBooksProgressListResponse = {
    data: TBookProgress[];
    pagination: PaginationResponseData;
};

export type TBookProgressResponse = {
    data: {
        data: TBookProgress;
    };
};
