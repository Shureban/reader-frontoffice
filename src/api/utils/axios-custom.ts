import axios from "axios";
import Storage from "storage/Storage";
import Env from "utils/env";

const http = axios.create({
    baseURL: Env.getApiDomain(),
    timeout: 10000,
});

http.interceptors.request.use((config: any) => {
    config.headers.Authorization   = `Bearer ${Storage.getApiToken()}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"]       = "application/json";

    return config;
}, undefined);

export default http;
