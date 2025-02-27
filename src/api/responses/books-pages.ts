import {PaginationResponseData} from "api/responses/base";
import {TPage} from "api/resources/page";

export type TBooksPagesListResponse = {
    data: TPage[];
    pagination: PaginationResponseData;
};
