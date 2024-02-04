import axios from 'axios'

const api = axios.create({
    baseURL: `http://api.weatherapi.com` 
})

export default api