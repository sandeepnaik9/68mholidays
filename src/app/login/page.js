"use client"
import axios from '../api/axios';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import OtpInput from '../comonents/OtpField';
import { useRouter } from 'next/navigation';
import { setAuth, setMobileNumber, setRole, setusername } from '../../store/slices/authSlice'
import { useAppDispatch } from '../../store/stores'
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth"
import {auth} from '../firebase'


const Login = ({params}) => {
  const [countryCodeRef,setCountryCode] = useState("+91");
  const [phoneNumberRef,setPhoneNumber] = useState();
  const [data,setData] = useState({"exisitingUSer":false,"data":""});
  const [enterdNumber,setEnterdNumber] = useState(false)
  const [otpSent,setOtpSent] = useState(false)
  const [username,setUserName] = useState("");
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpFields = useRef([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [confirmationResult,setConfirmationResult] = useState()

useEffect(()=>{
  // window.recaptchVerifier = new RecaptchaVerifier(auth, "recaptcha-container",{
  //   'size':'normal',
  //   'callback':(response)=>{

  //   },
  //   'expired-callback':()=>{

  //   }
  // })
},[auth])
  
  const sendOtp = useCallback(async ()=>{
    if(phoneNumberRef?.length==10){
      // const formattedPhoneNumber = `+${countryCodeRef}${phoneNumberRef}`
      // const confirmation = await signInWithPhoneNumber(auth,formattedPhoneNumber,window.recaptchVerifier)
      // setConfirmationResult(confirmation)
      // setOtpSent(true)
      const response = await fetch("/api/auth/sendOtp",{method:"POST",body:JSON.stringify({"phoneNo":parseInt(phoneNumberRef),"exisitingUser":data["exisitingUser"],"username":username?username:data["data"]["name"]}),headers:{'Content-Type':'application/json'}})
      const res = await response.json();
        if(res.Status==="Sent Successfully"){
          console.log("Otp Sent Successfully")
          console.log(res)
          setOtpSent(true)

        }
      
      

    } 
    
  },[phoneNumberRef,data,username])
  
  
  const getUser = useCallback(async (e)=>{
    e.preventDefault()
    const re = /^[0-9\b]+$/;
    if(e.target.value===""||re.test(e.target.value)){
      setPhoneNumber(e.target.value);
    }
    if(e.target.value.length==10){
      console.log(process.env.NEXT_PUBLIC_API_BASE_URL+"/auth/getUserDetails","API URL");
      await axios.post("api/auth/getUserDetails",{"phoneNo":parseInt(e.target.value)}).then(async (response)=>{
          setData(response.data);
          console.log(response.data["exisitingUser"])
          if(response.data["exisitingUser"]){
            console.log(response.data)
            setUserName(response.data["data"]["name"])
            console.log(phoneNumberRef?.length==10,phoneNumberRef?.length,"RESPONSE SENT OTP")
            // if(phoneNumberRef?.length==9){
            //   const response = await fetch("/api/auth/sendOtp",{method:"POST",body:JSON.stringify({"phoneNo":parseInt(phoneNumberRef),"exisitingUser":data["exisitingUser"],"username":username?username:data["data"]["name"]}),headers:{'Content-Type':'application/json'}})
              
            //   const res = await response.json();
            //   console.log(res,"RESPONSE SENT OTP")
            //     if(res.Status==="Sent Successfully"){
            //       console.log("Otp Sent Successfully")
            //       console.log(res)
            //       setOtpSent(true)
        
            //     }
              
              
        
            // } 
            
            setOtpSent(true)
          }
          if(phoneNumberRef?.length==10){
            console.log(data) 
            
          }
          
          setEnterdNumber(true);
          
      })
    }
    else{
      setData({"exisitingUSer":false,"data":""});
          setEnterdNumber(false);
    }
  },[phoneNumberRef,data,username])


  const handleCountryCode = (e)=>{
    e.preventDefault()
    const re = /^[0-9\b]+$/;
    if(e.target.value===""||re.test(e.target.value)){
      setCountryCode(e.target.value);
    }
  }



  const verifyOtp = async ()=>{
    
    const response = await fetch("api/auth/verifyOtp",{method:"POST",body:JSON.stringify({"phoneNo":parseInt(phoneNumberRef)}),headers:{'Content-Type':'application/json','withCredenetials':true}})
    if(response.ok){
      const res = await response.json()
      localStorage.setItem("outrightcode",res.token)
      dispatch(setMobileNumber(res.number))
      dispatch(setRole(res.role))
      dispatch(setusername(res.name))
      
      dispatch(setAuth(true))
      router.push("/package")
      

    }
    else{
      response.json().then(e=>
        console.log(e["message"])
      )
    }
    confirmationResult.confirm(otp.join("").trim()).then(async(e)=>
      {
        
      
} 
    )
        
}

  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center  h-100'>
          <div className='d-flex flex-column row-gap-3 col-3 justify-content-center cardLogin align-items-center'>
            {!otpSent&&(<div id="recaptcha-container"></div>)}
                <div>
                    Enter your mobile number to keep track of your fav pakages
                </div>
                {!enterdNumber?(<div className='d-flex column-gap-1 w-100'>
                  <input className='countryCode inputField' style={{width:"50px"}}  onChange={(e)=>handleCountryCode(e)} value={countryCodeRef} />
                    
                  <input className='phoneNumber inputField w-100' onChange={(e)=>{getUser(e)}} value={phoneNumberRef} type="text" placeholder="Enter your number" maxLength={10} />
                </div>):<></>}
                
                {
                !data["exisitingUser"]&&enterdNumber&&!otpSent?(<>
                <div className='d-flex column-gap-1 w-100'>  
                  <div className='phoneNumber inputField w-100 enterdText'> Your Mobile Number: {countryCodeRef} {phoneNumberRef} </div>
                </div>
                <div className='w-100'>
                <input className='userName inputField w-100' value={username} onChange={(e)=>setUserName(e.target.value)}  type="text" placeholder="Enter your name" />
                </div></>):<>
                  
                    
                </>}
                {otpSent?<div className='w-100'>
                  <div className='w-100'>Welcome back <span style={{fontWeight:7800,}}>{data["data"]?data["data"][0]["name"].toString():username}</span></div>
                  <div className='w-100'>Your number is {phoneNumberRef}</div>
                  <OtpInput otp={otp} setOtp={setOtp} otpFields={otpFields}/>
                </div>:<></>}
                <div className='w-100'>
                    <button className='btn w-100 btn-success' onClick={()=>otpSent?verifyOtp():sendOtp()}>
                      {otpSent?"Verify OTP":"Get OTP"} 
                    </button>
                </div>
          </div>
      </div>
    </>
  )
}

export default Login
