/* eslint-disable no-param-reassign */
import axios from 'axios';
import { toast } from 'react-toastify';

const messengerApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

messengerApi.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => toast.error(error.message)
);

messengerApi.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
);

export default messengerApi;
