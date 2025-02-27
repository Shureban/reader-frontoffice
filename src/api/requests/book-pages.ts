import {SortType} from "api/enums/sort-type";

export enum ListRequestSortColumn {
    Id     = 'id',
    Number = 'number',
}

export type TBooksPagesListRequest = {
    page: number;
    per_page: number;
    sort_column: ListRequestSortColumn;
    sort_type: SortType;
}
