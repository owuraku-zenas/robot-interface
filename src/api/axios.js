import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8000/api',
})

axios.interceptors.request.use(function (config) {
  
    //  removing trailing slash from end of url
    //  this little slash (which seems its called trailing), causes CORS error
  
    config.url = config.url.replace(/\/$/, "");
    
    return config;
});