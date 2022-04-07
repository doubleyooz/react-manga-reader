import axios from 'axios';

//api.defaults.headers.common['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] =
    'http://localhost:3000';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;
