import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:3000/';

const $api = axios.create({
    baseURL: API_URL,
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    return config;
};

$api.interceptors.request.use(authInterceptor);

export default $api;
