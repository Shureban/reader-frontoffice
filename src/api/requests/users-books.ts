import {SortType} from "api/enums/sort-type";

export enum ListRequestSortColumn {
    Id        = 'id',
    CreatedAt = 'created_at',
    UpdatedAt = 'updated_at',
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
