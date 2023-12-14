import axios from 'axios';

const apiClient = axios.create({
  baseURL: (location.host.includes('localhost')
    ?'https://molocinque.ns0.it/node/icloak'
    :'/node/icloak'),
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_APP_APIKEY,
  }
})
export default apiClient;