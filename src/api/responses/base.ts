export type AxiosResponse = {
  data: any,
  status: number,
  statusText: string,
}

export type PaginationResponseData = {
  current_page: number,
  per_page: number,
  total: number,
  first_page_url: string,
  from: number | null,
  to: number | null,
  last_page: number,
  last_page_url: string,
}
