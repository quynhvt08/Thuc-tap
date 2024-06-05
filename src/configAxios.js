import axios from 'axios';

// Tạo một instance axios
const apiCall = axios.create({
    baseURL: 'http://localhost:3001',
});
apiCall.interceptors.request.use(
    config => {
        if (apiCall.defaults.headers.common['Authorization']) {
            config.headers.Authorization = apiCall.defaults.headers.common['Authorization'];
        }
        return config;
    },
    error => Promise.reject(error)
);

export default apiCall;
