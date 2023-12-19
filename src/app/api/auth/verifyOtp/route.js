import { query } from "../../../../lib/db";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(request) {
    const response = NextResponse;
    const iat = Math.floor(Date.now() / 1000);
    const { phoneNo, Otp } = await request.json();
    
    const q_res = await query({ query: `SELECT * FROM User WHERE mobile_number=${parseInt(phoneNo)};`, values: [] });
    
    const matchOtp = await bcrypt.compare(Otp.join("").toString(), q_res[0]["otp"])
    console.log(Otp.join("").toString())
    
    if (matchOtp) {
        delete q_res[0].otp
        const token = await new SignJWT({ q_res }).setProtectedHeader({alg: 'HS256', typ: 'JWT'}).sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_TOKEN));
        const serialized = serialize("outrightcode", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 604800,
            path: "/"
        })
        const res = {
            message: "Authenticated",
            token:token,
            number:q_res[0].mobile_number,
            role:q_res[0].Role,
            name:q_res[0].name

        }
        await query({ query: `UPDATE User Set otp=(?) WHERE mobile_number=${parseInt(phoneNo)};`, values: [""] });

        
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { "Set-Cookie": serialized },
        })
    }

    else {
        return new Response(JSON.stringify({ "status": "failed", "message": "Invalid OTP or The OTP Must have Expired" }), { status: 403 })
    }


    // console.log(q_res,process.env.MYSQL_HOST,"MYSQL HOST")
    //TO Do Api Integartion for sending OTP
}
