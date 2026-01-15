import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { createSession,getActiveSession,getMyRecentSession,getSessionById,joinSession,endSession } from '../controllers/session.controller.js';
const router=express.Router();

// #region agent log
router.get('/active', (req, res, next) => {
  fetch('http://127.0.0.1:7242/ingest/1effe9a3-fb30-41d9-9505-662d83af0e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sessionRoute.js:8',message:'Route matched /active',data:{method:req.method,path:req.path,url:req.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  next();
}, protectRoute,getActiveSession);
// #endregion
router.post('/', protectRoute, createSession);
router.get('/my-recent', protectRoute, getMyRecentSession);
router.get('/:id', protectRoute,getSessionById);
router.post('/:id/join', protectRoute,joinSession)
router.post('/:id/end', protectRoute,endSession)


export default router
