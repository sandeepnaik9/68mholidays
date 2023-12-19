import { useEffect, useState } from "react";
import {onAuthStateChanged} from "firebase/auth"
import auth from '../app/firebase'
export function useUser() {
    const [user,setUser] = useState()

    useEffect(()=>{
        return  onAuthStateChanged(auth,(user)=>setUser(user))
    },[])
    return user;
}