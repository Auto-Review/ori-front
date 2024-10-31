import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.defaults.baseURL = `${process.env.REACT_APP_API_URL}`

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
        config.headers['Authorization'] = token; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        if(error.response && (error.response.status === 401) && !originalRequest._retry){

            originalRequest._retry = true;

            try{
                const { headers } = await axios.get(`${process.env.REACT_APP_API_URL}/v1/api/auth/reissued`, {
                    headers:{
                        Authorization: localStorage.getItem('accessToken'),
                        refreshToken: localStorage.getItem('refreshToken'),
                    },
                    withCredentials: true,
                });
                
                const newAccessToken = headers['accessToken'];
                const newRefreshToken = headers['refreshToken'];
                
                if (newAccessToken && newRefreshToken) {
                    localStorage.setItem('accessToken', newAccessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    originalRequest.headers['Authorization'] = newAccessToken;
                    return axiosInstance(originalRequest);
                }
          
            } catch(error){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(error);
            }
        } else if(error.response && (error.response.status === 401)){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
