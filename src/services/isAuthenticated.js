import { jwtVerify } from "jose"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


const isAuthenticated = async () => {
    try{
        const token = cookies().get()
        const verif  = await jwtVerify(token,new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_TOKEN));
    return verif.payload;
    }
    catch(err){
        
    }
    
}

export default isAuthenticated