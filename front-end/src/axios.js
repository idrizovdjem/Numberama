import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44313',
});

instance.interceptors.request.use(config => {
    const accessToken = sessionStorage.getItem('accessToken');
    if(accessToken) {
        config.headers.post['authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
  });

export default instance;