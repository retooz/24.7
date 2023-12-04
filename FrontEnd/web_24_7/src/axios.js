import axios from 'axios';

// eslint-disable-next-line
const apiKey = process.env.REACT_APP_AXIOS_URL;
const instance = axios.create({
    baseURL: 'http://20.249.87.104:3000',
    // baseURL: 'http://247.azurewebsites.net:3000',
    // baseURL: 'http://localhost:3000',
    headers: {
        accept: 'application/json',
    },
});

export default instance;
