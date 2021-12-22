import axios from 'axios';

const apiUrl = process.env.PYTHON_URL;

const snmpagentApi = axios.create({
    baseURL: apiUrl,
});

export default snmpagentApi;
