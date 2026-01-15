import axios from 'axios'

// #region agent log
const baseURL = import.meta.env.VITE_API_URL;
fetch('http://127.0.0.1:7242/ingest/1effe9a3-fb30-41d9-9505-662d83af0e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apiInstance.js:4',message:'BaseURL configuration',data:{baseURL,isUndefined:baseURL===undefined,isNull:baseURL===null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B'})}).catch(()=>{});
// #endregion

const axiosInstance=axios.create({
    baseURL:baseURL,
    withCredentials:true
})

export default axiosInstance
