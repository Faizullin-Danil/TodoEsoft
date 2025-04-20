import axios, { InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:3000/';

const $api = axios.create({
    baseURL: API_URL,
});

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
    const authData = JSON.parse(localStorage.getItem('auth') || '{}');
    const accessToken = authData?.token;

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
};

$api.interceptors.request.use(authInterceptor);

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('я тут')
        const originalRequest = error.config;
        const status = error.response?.status;

        // Если токен истек, обновляем
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = JSON.parse(localStorage.getItem('auth') || '{}').refreshToken;

                const response = await axios.post('http://localhost:3000/api/refresh-token', {}, {
                    headers: { Authorization: `Bearer ${refreshToken}` },
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                // Сохраняем новые токены
                localStorage.setItem('auth', JSON.stringify({ token: accessToken, refreshToken: newRefreshToken }));

                // Повторяем оригинальный запрос с новым access token
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default $api;
