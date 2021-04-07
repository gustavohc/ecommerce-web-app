import axios from 'axios';

export default () => {
  const instance = axios.create({
        baseURL: `${process.env.VUE_APP_API_AUTH_URL}`
    });

  return instance;
};
