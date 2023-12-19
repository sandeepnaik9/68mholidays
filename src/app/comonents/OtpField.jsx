import axios from 'axios';
import React, { useState, useRef } from 'react';

const OtpInput = ({otp,setOtp,otpFields}) => {
    
    
   
    const handleChange = (index, event) => {
      const value = event.target.value;
      if (!/^[0-9]*$/.test(value)) {
        return;
      }
  
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      // Move to the next input field
      if (value && index < 5) {
        otpFields.current[index + 1].focus();
      }
    };
  
    const handlePaste = (event) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData('text/plain').slice(0, 6);
  
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        if (i < 6 && /^[0-9]*$/.test(pasteData[i])) {
          newOtp[i] = pasteData[i];
        }
      }
      setOtp(newOtp);
    };
  
    const handleKeyDown = (index, event) => {
      if (event.key === 'Backspace' && index > 0 && !otp[index]) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpFields.current[index - 1].focus();
      }
    };
  
  return (
    <div className='w-100'>
      <h2 className='w-100 text-center mb-3'>Enter OTP</h2>
      <div className='d-flex justify-content-center column-gap-4'>
        {otp.map((digit, index) => (
          <input
          className='otpFields'
            style={{width:"40px",height:"40px",textAlign:'center'}}
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onChange={(e) => handleChange(index, e)}
            onPaste={handlePaste}
            ref={(el) => (otpFields.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
