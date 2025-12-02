import { StreamChat } from "stream-chat";
//import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from './env.js'

const api_key=ENV.STREAM_API_KEY
const api_secret=ENV.STREAM_SECRET_KEY
if(!api_key || !api_secret){
    console.error(" Stream api_key or  api_secret is missing")

}
export const chatClient=StreamChat.getInstance(api_key,api_secret)


export const upsertStream=async(userdata)=>{
    try {
          await chatClient.upsertUser(userdata)
          return userdata  
    } catch (error) {
        console.error("Error upserting stream user", error)
    }
}
export const deleteStream=async(userId)=>{
    try {
        await chatClient.deleteUser(userId);
        console.log("Stream user delted successfully!");
        
    } catch (error) {
        console.error("Error deleting stream user",error)
    }
}

