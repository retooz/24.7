import axios from 'axios';

// eslint-disable-next-line
const apiKey = process.env.REACT_APP_AXIOS_URL;
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        accept: 'application/json',
    },
});

export default instance;
