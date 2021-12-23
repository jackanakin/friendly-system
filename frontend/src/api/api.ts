import axios from 'axios';

const apiUrl = 'http://localhost:3333';

const api = axios.create({
    baseURL: apiUrl,//process.env.REACT_APP_API_URL,
    withCredentials: true
});

export default api;
