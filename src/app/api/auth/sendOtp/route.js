import { query } from "../../../../lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server"
import client from "twilio"
import crypto, { randomUUID } from 'crypto'
import bcrypt, { compareSync, hash } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
const querystring = require('querystring');
const tlClient = axios.create({
    baseURL: "https://api.textlocal.in/",
    params: {
      apiKey: "NDM0NjQ5NjI1MTZiNGU1NTU1NGQ3NTRjNjY2YjQyMzk=", //Text local api key
      sender: "smhlds"
    }
  });


function sendSMS(apikey, numbers, sender, message) {
  const data = JSON.stringify({
    sender: sender,
    numbers: numbers,
    message: message,
 
  });

  const params = new URLSearchParams()
  params.append("numbers","918885450415")
  params.append("message","HELLO WORLD")

  axios.create({baseURL:'https://api.textlocal.in/',params:{
    apikey: apikey,

  }}).post("/send",data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error sending SMS:', error);
  });
}




export async function POST (request){
    const response = NextResponse;
    
    // console.log(tl.sendSMS("918885450415",'this is test message','Sender',function(err,data){console.log(err,data,"TEXTLOCAL")}),"TEXTLOCALS")
    sendSMS("MzI3NTM1NGI0ODcwNDI2Nzc5NTc0OTQxNDE2MzQ3Nzc=","918885450415","smhlds","This is sample message kindly ignore")
    const {phoneNo,exisitingUser,username} = await request.json();
    const otp = crypto.randomInt(100000, 999999);
    
    const q_res = await query({query:`SELECT * FROM User Where mobile_number=${phoneNo};`,values:[]});
    const hashedOtp = await bcrypt.hash(otp.toString(),10)
    
    if(q_res.length&&exisitingUser){
        console.log(otp)
        await query({query:`UPDATE User SET otp="${hashedOtp}" where mobile_number=${phoneNo}`,values:[]})
        await axios("https://api.textlocal.in/send/?",{method:"POST"})
        // To Do Send OTP Message API Integration
        return response.json({"Status":"Success","Message":"Sent","OTP":otp})
    }
    else{

        await query({query:`INSERT Into User (user_id,name,mobile_number,otp) Values (?,?,?,?)`,values:[uuidv4().toString(),username,phoneNo,hashedOtp]})
        // await query(`UPDATE User set otp=${hashedOtp} where mobile_number=${phoneNo}`);
        // Todo Send otp to client using api
        
        

        return response.json({"Status":"Sent Successfully","Message":"Sent","Otp":otp})
    }
    // console.log(q_res,process.env.MYSQL_HOST,"MYSQL HOST")
    
    
}
