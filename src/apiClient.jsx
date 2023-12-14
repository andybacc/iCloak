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
apiClient.interceptors.request.use(function (config) {
  const JWT = localStorage.getItem('iCloakToken');
  if (JWT) config.headers['x-auth-token'] = JWT;
  return config;
}, function (e) {
  console.log(e)
  return Promise.reject(e);
});

export default apiClient;