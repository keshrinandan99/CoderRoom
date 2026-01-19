import {useMutation, useQuery} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { sessionApi } from '../api/sessions'

export const useCreateSession=()=>{
    const result=useMutation({
        mutationKey:["createSession"],
        mutationFn:sessionApi.createSession,
        onSuccess:()=>toast.success('Room created Successfully!'),
        onError:(error)=>toast.error(error?.response?.data?.message || 'Failed to create session')
    })
    return result;
}

export const useMyRecent=()=>{
    const result=useQuery({
        queryKey:["getMyRecentSession"],
        queryFn:sessionApi.getMyRecentSessions,

    })
    return result;
}
export const useActiveSession=()=>{
    const result=useQuery({
        queryKey:["activeSessions"],
        queryFn:sessionApi.getActiveSessions       
    })
return result
}
export const useSessionById=(id)=>{
    const result=useQuery({
        queryKey:["getSessionById",id],
        queryFn:()=>sessionApi.getSessionById(id),
        enabled:!!id, //for boolean values !! is used, remember it
        refetchInterval:5000,

    })
    return result;
} 
export const useJoinSession=()=>{
    const result= useMutation({
        mutationKey:["joinSession"],
        mutationFn:()=>sessionApi.joinSession,
        onSuccess:()=>toast.success("User joined Successfully"),
        onError:(error)=>toast.error(error?.response?.data?.message || 'Failed to join session')
    })
    return result;
}
export const useEndSession=()=>{
    const result=useMutation({
        mutationKey:["endSession"],
        mutationFn:()=>sessionApi.endSession,
        onSuccess:()=>toast.success("Session ended Successfully"),
        onError:(error)=>toast.error(error.response.data.message)
    })
    return result
}