import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

Axios.defaults.withCredentials = true;

export default Axios;
