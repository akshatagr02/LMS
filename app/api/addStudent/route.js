import { database } from "@/app/utils/firebaseConfig"
import { get, push, ref, set } from "firebase/database"


export async function POST(request) {
    const body = await request.json()
    let success,msg

   try {

    
            const useRef = ref(database, 'user')
            const newDataRef = push(useRef)
            set(newDataRef, body)
            msg = "Student Added!"
            success = true
            
        } catch (e) {
            console.log('error', e)
            msg= "Error"
            success = false
        }



return Response.json({success:success,message:msg})
}


