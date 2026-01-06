import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router"
import { useActiveSession, useCreateSession, useMyRecent } from "../hooks/useSessions";
import Navbar from "../../components/Navbar";
import WelcomeSection from "../../components/WelcomeSection";
import ActiveSessionCard from "../../components/ActiveSessionCard";
import StatsCard from "../../components/StatsCard";
import RecentSessions from "../../components/RecentSessions";
import CreateSessionModal from "../../components/CreateSessionModal"
function Dashboard() {
  const navigate=useNavigate();
  const { user } = useUser();
  const[roomConfig,setroomConfig]=useState({problem:"", difficulty:""});
  const [showModal,setShowModal]=useState(false);
  const createSessionMutation=useCreateSession();
  const{data:activeSessionData,isLoading:loadingActiveSession}=useActiveSession();
  const{data:recentSessionData,isLoading:loadingRecentSession}=useMyRecent()

  const handleCreateRoom=()=>{
    if(!roomConfig.problem || !roomConfig.difficulty)return;
    createSessionMutation.mutate({
      problem:roomConfig.problem,
      difficulty:roomConfig.difficulty.toLowerCase()
    },
    {
      onSuccess:(data)=>{
        setShowModal(false)
        navigate(`/session/${data.session._id}`)
      }
    }
  )
  }
  const activeSession=activeSessionData?.session|| []
  const recentSession=recentSessionData?.session ||[]
  
  const isUserInSession=(session)=>{
    if(!user.id)return false;
    return session.host?.clerkId==user.id || session.participant?.clerkId===user.id;
  }

  
  
  
  return (
   <>
    <div className="min-h-screen bg-base-300">
      <Navbar/>
      <WelcomeSection onCreateSession={()=>setShowModal(true)}/>

      <div className="container mx-auto p-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatsCard
            activeSessionCount={activeSession.length}
            recentSessionCount={recentSession.length}
          />
          <ActiveSessionCard
           sessions={activeSession}
           isLoading={loadingActiveSession}
           isUserInSession={isUserInSession}
          />

        </div>
        <RecentSessions
          sessions={recentSession}
          isLoading={loadingRecentSession}
        />

      </div>
    </div>
    <CreateSessionModal
      isOpen={showModal}
      onClose={()=>setShowModal(false)}
      roomConfig={roomConfig}
      setroomConfig={setroomConfig}
      onCreateRoom={handleCreateRoom}
      isCreating={createSessionMutation.isPending}
    />
   </>
  )
}

export default Dashboard