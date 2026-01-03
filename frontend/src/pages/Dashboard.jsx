import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router"
import { useActiveSession, useCreateSession, useMyRecent } from "../hooks/useSessions";


function Dashboard() {
  const navigate=useNavigate();
  const { user } = useUser();
  const[roomConfig,setroomConfig]=useState({problem:"", difficulty:""});
  const [showModal,setShowModal]=useState(false);
  const createSessionMutation=useCreateSession();
  const{data:activeSessionData,isLoading:loadingActiveSession}=useActiveSession();
  const{data:recentSessionData,isLoading:loadingRecentSession}=useMyRecent()
  console.log(activeSessionData);
  console.log(recentSessionData);
  
  
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard