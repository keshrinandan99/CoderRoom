import axiosInstance from "../lib/apiInstance";

export const sessionApi = {
  createSession: async (data) => {
    const response = await axiosInstance.post("/session", data);
    return response.data;
  },

  getActiveSessions: async () => {
    // #region agent log
    const fullUrl = axiosInstance.defaults.baseURL + "/session/active";
    fetch('http://127.0.0.1:7242/ingest/1effe9a3-fb30-41d9-9505-662d83af0e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessions.js:10',message:'Request URL construction',data:{baseURL:axiosInstance.defaults.baseURL,path:'/session/active',fullUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B'})}).catch(()=>{});
    // #endregion
    try {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/1effe9a3-fb30-41d9-9505-662d83af0e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessions.js:12',message:'Before axios request',data:{url:'/session/active'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      const response = await axiosInstance.get("/session/active");
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/1effe9a3-fb30-41d9-9505-662d83af0e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessions.js:15',message:'Request successful',data:{status:response.status,statusText:response.statusText},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      return response.data;
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/1effe9a3-fb30-41d9-9505-662d83af0e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessions.js:19',message:'Request error',data:{message:error.message,status:error.response?.status,statusText:error.response?.statusText,url:error.config?.url,baseURL:error.config?.baseURL},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'})}).catch(()=>{});
      // #endregion
      throw error;
    }
  },
  getMyRecentSessions: async () => {
    const response = await axiosInstance.get("/session/my-recent");
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await axiosInstance.get(`/session/${id}`);
    return response.data;
  },

  joinSession: async (id) => {
    const response = await axiosInstance.post(`/session/${id}/join`);
    return response.data;
  },
  endSession: async (id) => {
    const response = await axiosInstance.post(`/session/${id}/end`);
    return response.data;
  },
  getStreamToken: async () => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
  },
};