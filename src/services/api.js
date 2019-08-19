import axios from 'axios';

const api = axios.create({
  baseURL: 'http://paperball.com.br:3333/api',
});

export default api;
