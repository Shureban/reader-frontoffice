import {SortType} from "api/enums/sort-type";

export enum ListRequestSortColumn {
    Id = 'id',
}

export type TBooksProgressListRequest = {
    page: number;
    per_page: number;
    sort_column: ListRequestSortColumn;
    sort_type: SortType;
}

export type TGetProgressRequest = {
    book_id: number;
}

export type TStartBookReadingRequest = {
    book_id: number;
}
