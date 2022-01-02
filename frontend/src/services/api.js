import axios from 'axios';

export async function api () {

  const accessToken = localStorage.getItem('@App:Token_Key');

  const instance = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 120000
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers = Object.assign(
        {
          Authorization: accessToken
        },
        config.headers
      )
      return config;
    },
    (err) => Promise.reject(err)
  )
  
  return instance;
}
