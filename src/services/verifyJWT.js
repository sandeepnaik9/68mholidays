import { jwtVerify } from "jose"
import { NextResponse } from "next/server";


const verifyJWT = async ({token,request}) => {
    try{
        const verif  = await jwtVerify(token,new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_TOKEN));
    return verif.payload;
    }
    catch(err){
        NextResponse.redirect(new URL("/",request.url))
    }
    
}

export default verifyJWT