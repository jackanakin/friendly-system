import axios from 'axios';

const apiUrl = process.env.PYTHON_URL;

const snmpApi = axios.create({
    baseURL: apiUrl,
});

export default snmpApi;
