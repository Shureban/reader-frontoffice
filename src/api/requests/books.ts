import {SortType} from "api/enums/sort-type";

export enum ListRequestSortColumn {
    Id = 'id',
}

export type TBooksListRequest = {
    page: number;
    per_page: number;
    sort_column: ListRequestSortColumn;
    sort_type: SortType;
}
