import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    headers: {
        accept: 'application/json',
    },
});

export default instance;
