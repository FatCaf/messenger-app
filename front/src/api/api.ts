import axios from 'axios';

const messengerApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

messengerApi.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.log(error.cause);
    }
  }
);

export default messengerApi;
