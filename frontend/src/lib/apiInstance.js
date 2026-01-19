import axios from 'axios'

// #region agent log
const baseURL = import.meta.env.VITE_API_URL;


const axiosInstance=axios.create({
    baseURL:baseURL,
    withCredentials:true
})

export default axiosInstance
