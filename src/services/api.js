import axios from 'axios';

//api.defaults.headers.common['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] =
    process.env.REACT_APP_NOT_SECRET_CODE;
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.REACT_APP_NOT_SECRET_CODE,
});

export default api;
