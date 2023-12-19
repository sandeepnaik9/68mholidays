import { cookies } from "next/headers";
import { query } from "../../../../lib/db";
import { NextResponse } from "next/server"
import {jwtVerify} from 'jose'

export async function GET(request) {
    const response = NextResponse;
     const user =  await request.nextUrl.searchParams.get("user");
     const token = cookies().get("outrightcode");
     let verif = false
     if(token){
      verif = await jwtVerify(token.value,new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_TOKEN));
    
      console.log(verif.payload.q_res[0].mobile_number)
    }
    const access = await query({ query: `SELECT * FROM ROLES WHERE mobile_number=(?)`, values: [verif.payload.q_res[0].mobile_number] }); 
    
    
    

    let q_res;
    if(access.length){
     q_res = await query({ query: `SELECT *, REPLACE(package_id, 'packageId-', '') AS package_id FROM Packages`, values: [] });
     
    }
if(!access.length){
    q_res = await query({ query: `SELECT *, REPLACE(package_id, 'packageId-', '') AS package_id FROM Packages WHERE Status="PUBLISHED"`, values: [] });
    
}

return new Response(JSON.stringify(q_res),{status:200})
}
