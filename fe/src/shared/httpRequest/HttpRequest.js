import axios from 'axios';

const HttpRequest = axios.create({
    baseURL: 'http://localhost:3333'
})

export default HttpRequest;