import axios from 'axios';

export default () => {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}`
  });
  const currUser = localStorage.getItem('user') ? localStorage.getItem('user') : undefined;
  if(currUser) instance.defaults.headers.common.Authorization = `Bearer ${currUser}`;
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if(error.response.status === 401){
          localStorage.removeItem('user');
          //location.reload();
      }
      return Promise.reject(error);
    }
  )

  return instance;
};