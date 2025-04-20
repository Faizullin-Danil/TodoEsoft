import axios, { InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:3000/';

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
});  

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth')
    console.log(token)
    const accessToken = token;

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
};

$api.interceptors.request.use(authInterceptor);

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('тут')
      const originalRequest = error.config;
      const status = error.response?.status;
  
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const response = await axios.post('http://localhost:3000/api/refresh-token', {}, {
            withCredentials: true 
          });
  
          const { accessToken } = response.data;
  
          localStorage.setItem('auth', JSON.stringify({ token: accessToken }));
  
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
