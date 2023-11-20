import axios from 'axios';

const URL = 'http://localhost:8080';

// 배포서버
const awsurl = 'http://13.124.6.16:8080';

// 현재 환경에 따라 서버 주소를 선택
const serverAddress = process.env.NODE_ENV === 'production' ? awsurl : URL;

const axiosAPI = axios.create({
  baseURL: serverAddress,
  timeout: 5000,
});

export default axiosAPI;

const local = 'http://localhost:8080';
const aws = 'http://13.124.6.16:8080';
const API_URL = process.env.NODE_ENV === 'production' ? aws : local;

export { API_URL };
