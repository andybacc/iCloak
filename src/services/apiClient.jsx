import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_APIURL,
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_APP_APIKEY,
  }
})

export default apiClient;