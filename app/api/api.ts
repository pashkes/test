import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://next-docs-api.onrender.com',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  console.log('Token:', token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});