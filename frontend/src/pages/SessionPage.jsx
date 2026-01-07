import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../../data/problems";
import { executeCode } from "../lib/piston";

function SessionPage() {
    const navigate=useNavigate();
    const {id}=useParams();
    const {user}=useUser();
    const [output,setOutput]=useState(null);
    const [isRunning,setIsRunning]=useState(false)

    const {data:sessionData,isLoading:loadingSession,refetch}=useSessionById(id);
    const joinSessionMutation=useJoinSession();
    const endSessionMutation=useEndSession();
    const session=sessionData?.session;
    const isHost=session?.host?.clerkId==user?.id;
    const isParticipant=session?.participant?.clerkId==user?.id;
    const problemData=session?.problem?Object.values(PROBLEMS).find((p)=>p.title===session.problem):null;
    const [selectedLanguage,setSelectedLanguage]=useState("javascript");
    const [code,setCode]=useState(PROBLEMS?.starterCode?.[selectedLanguage] || "");

    useEffect(()=>{
            if(problemData?.starterCode?.[selectedLanguage]){
                setCode(problemData?.starterCode[selectedLanguage]);
            }
    },[problemData,selectedLanguage]);

    useEffect(()=>{
        if(!session || !user || loadingSession)reutrn;
        if(isHost || isParticipant)reutrn;
        joinSessionMutation.mutate(id,{onSuccess:refetch});
    },[session,user,loadingSession,isHost,isParticipant,id])


    useEffect(()=>{
        if(!session || isLoading)return;
        if(session.status==="completed")navigate("/dashboard");
    },[session,isLoading,navigate])

    const handleLanguageChange=(e)=>{
        const new_lang=e.target.value;
        setSelectedLanguage(new_lang);
        setCode(PROBLEMS?.starterCode?.[new_lang]);
        setOutput(null);
    }

    const handleCodeRun=async()=>{
        setOutput(null);
        setIsRunning(true);
        const result=await executeCode(selectedLanguage,code);
        setOutput(result);
        setIsRunning(false)
    }
    const handleEndSession=()=>{
        if(confirm("Are you sure you want to end the session?")){
            endSessionMutation.mutate({id},{onSuccess:()=>navigate("/dashboard")})
        }
    }



  return (
    <div>SessionPage</div>
  )
}

export default SessionPage