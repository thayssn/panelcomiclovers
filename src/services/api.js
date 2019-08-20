import axios from 'axios';
import env from '../env';

const api = axios.create({
  baseURL: `${env.baseUrl}/api`,
});

export default api;
