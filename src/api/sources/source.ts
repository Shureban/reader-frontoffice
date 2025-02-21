import {AxiosInstance} from "axios";

export default class Source {

  protected client: AxiosInstance;

  constructor(client: AxiosInstance)
  {
    this.client = client;
  }
}
