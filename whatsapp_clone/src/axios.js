import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://whatsapp-mern-7e2e9.web.app/',
});

export default instance;