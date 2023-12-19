import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST (request){
    


    const res = {"redirect":"/"}
    console.log(cookies().get("outrightcode"),"Logout Code")
    const serialized = serialize("outrightcode", cookies().get("outrightcode"), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: -1,
        path: "/"
    })
    const response = new Response(JSON.stringify(res), {
        status: 200,
        headers: { "Set-Cookie": serialized },
    })
    return response
    
    // console.log(q_res,process.env.MYSQL_HOST,"MYSQL HOST")
}
