import mongoose from 'mongoose'
import {ENV} from './env.js'
export const dbConnect=async()=>{
try {
   await mongoose.connect(ENV.DB)
    console.log("Mongodb connected successfully");
    
} catch (error) {
    console.error("Error connecting db",error)
    process.exit(1)
}
}

//export default dbConnect