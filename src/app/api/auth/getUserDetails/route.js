import { query } from "../../../../lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server"
import client from "twilio"
import axios from "axios"
import crypto, { randomUUID } from 'crypto'
import bcrypt from "bcryptjs"
export async function POST (request){
    const response = NextResponse;
    const {phoneNo} = await request.json();
    const q_res = await query({query:`SELECT * FROM User Where mobile_number=${phoneNo};`});
    if(q_res.length){
        const otp = crypto.randomInt(100000, 999999);
        const hashedOtp = await bcrypt.hash(otp.toString(),10)
        delete q_res[0].otp
        delete q_res[0].user_id
        await query({query:`UPDATE User SET otp="${hashedOtp}" where mobile_number=${phoneNo}`,values:[]})
        return response.json({"exisitingUser":true,"data":q_res,"Status":"Success","OTP":otp})
    }
    else{
        return response.json({"exisitingUser":false})
    }
    // console.log(q_res,process.env.MYSQL_HOST,"MYSQL HOST")
    

}
