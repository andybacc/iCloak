import axios from 'axios';

const apiClient = axios.create({
  baseURL: (location.host.includes('localhost')
    ?'http://192.168.1.2/node/iguardaroba2'
    :'/node/iguardaroba2'),
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_APP_APIKEY,
  }
})
export default apiClient;