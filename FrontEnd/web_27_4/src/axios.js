import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://1.226.185.17',
    headers: {
        accept: 'application/json',
    },
});

export default instance;
