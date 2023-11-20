import axios from 'axios';

const URL = 'http://localhost:8080';

const axiosAPI = axios.create({
  baseURL: URL,
  timeout: 5000,
});

export default axiosAPI;
