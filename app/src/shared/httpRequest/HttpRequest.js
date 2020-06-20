import axios from 'axios';

const HttpRequest = axios.create({
    baseURL:'http://192.168.0.15:3333',
});

export default HttpRequest;