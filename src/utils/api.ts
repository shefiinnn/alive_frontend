import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  const publicPaths = ['gallery/','products/','categories/','orders/'];  

  const isPublicPath = publicPaths.some(path => config.url?.includes(path));
  if (token && !isPublicPath) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

export default api;
