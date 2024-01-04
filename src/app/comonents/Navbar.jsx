"use client"
import React, { useState } from 'react'


import Link from 'next/link'
import { useEffect } from 'react'
import { jwtDecrypt, jwtVerify } from 'jose'
import { usePathname, useRouter } from 'next/navigation'
import { setAuth, setMobileNumber, setRole, setusername } from '../../store/slices/authSlice'
import { useAppDispatch,useAppSelector } from '../../store/stores'
import { setIsEditing } from '../../store/slices/packageSlice'
import { Slide } from 'react-awesome-reveal'

const Navbar =  () => {

   const path = usePathname();
   const isAuth = useAppSelector((state) => state.auth.isAuth);
    const [isAuthenticated,setIsuthenticated] = useState(false)
    const dispatch = useAppDispatch();
    const router = useRouter()
    useEffect(() => {
        console.log(path)
        if(isAuth){
            setIsuthenticated(true)
        }
        else{
            setIsuthenticated(false)
        }
      }, [isAuth])
    const [navbardata,setNavbarData] = useState([
        {
            "main":"International Holiday",
            "sub":[
                {
                    "name": "Bali",
                    "path": ""
                },
                {
                    "name": "Dubai",
                    "path": ""
                },
                {
                    "name": "Malaysia",
                    "path": ""
                },
                {
                    "name": "Maldives",
                    "path": ""
                },
                {
                    "name": "Mauritius",
                    "path": ""
                },
                {
                    "name": "Seychelles",
                    "path": ""
                },
                {
                    "name": "Singapore",
                    "path": ""
                },
                {
                    "name": "Sri Lanka",
                    "path": ""
                },
                {
                    "name": "Thailand",
                    "path": ""
                }
            ]
            
        },
        {
            "main":"Domestic",
            "sub":[
                {
                    "name": "Coorg",
                    "path": ""
                },
                {
                    "name": "Goa",
                    "path": ""
                },
                {
                    "name": "Golden Triangle",
                    "path": ""
                },
                {
                    "name": "Himachal",
                    "path": ""
                },
                {
                    "name": "Hyderabad",
                    "path": ""
                },
                {
                    "name": "Kashmir",
                    "path": ""
                },
                {
                    "name": "Kerala",
                    "path": ""
                },
                {
                    "name": "Kodaikanal",
                    "path": ""
                },
                {
                    "name": "North East",
                    "path": ""
                },
                {
                    "name": "Ooty",
                    "path": ""
                },
                {
                    "name": "Uttarakhand",
                    "path": ""
                },
                {
                    "name": "Vizag",
                    "path": ""
                }
            ]
            
        },
      
        {
            "main":"Login",
            "path":"/login",
            "sub":[

            ]
        }
    ])

    const logoutFunction = async()=>{
        dispatch(setAuth(false))
        localStorage.removeItem("outrightcode")
        dispatch(setAuth(""))
        dispatch(setusername(""))
        dispatch(setMobileNumber(""))
        dispatch(setRole(""))
        dispatch(setIsEditing(false))
        const res = await fetch("/api/auth/Logout",{method:"POST"})
        const {redirect} =  res.json();
        router.push("/")
    }

    const [isOpen,setOpen] = useState(false);
    const handleMenu= ()=>{
        
        setOpen(!isOpen);
        if(!isOpen){
            document.querySelector(".mainmenu").classList.add("active")
        }
        else{
            document.querySelector(".mainmenu").classList.remove("active")
        }
    }

    const handleSubmenu = (e)=>{
        if(e.target.classList.contains("active")){
            e.target.classList.remove("active");
        }
        else{
            e.target.classList.add("active");
        }
            
    }

  return (
    <>
    
    <div className='container-fluid position-relative main-menu-nav z-5' style={{}}>
            <div className='container d-flex justify-content-between align-items-center p-4'>
            <Slide className='main-menu-nav ' direction='down' triggerOnce>
                <Link href="/" className='logo'>
                    {/* <img src={"/assets/logo-2.png"} alt="" /> */}
                    <div className='h5'>
                        <div><img src="logo.png" height={50} width={50} style={{objectFit:"contain"}} alt="" srcset="" /><span style={{fontWeight:"300"}}>68</span><span style={{fontWeight:"700"}}>M</span> Holidays</div>
                    </div>
                </Link>
                </Slide>
                <div>
                <div className='mainmenu'>
                    
                    <ul className='d-flex align-items-center m-0 navigationmain column-gap-5'>
                        {navbardata.map(el=>
                        (
                            <>
                            <Slide className='main-menu-nav ' direction='down' triggerOnce>
                        <li key={el.main} className={el.sub?"position-relative navhover":"navhover"} onClick={(e)=>handleSubmenu(e)}>
                            {el.path?(<>{<Link href={el.path} onClick={()=>{el.main==="Login"&&isAuthenticated&&logoutFunction();handleMenu()}} className={el.main=="Login"?"text-decoration-none text-black":"text-decoration-none text-black"}>{el.main==="Login"&&isAuthenticated?"Logout":el.main}</Link>}</>):(<><div className='d-flex h-100 align-items-center column-gap-2'>{el.main} {el.sub.length?<span><i className="fa-solid fa-angle-down rotate" style={{color:"black",fontWeight:"600"}}></i></span>:""}</div></>)}
                            
                            
                            {el.sub.length?
                                (<>
                                
                                    <div className='submenu'>
                                    <ul className=' w-100' >
                                        {
                                            el.sub.map((els,i)=>(
                                               <li key={els.name+i}>
                                                <Link href="#" onClick={()=>handleMenu()}>
                                                {els.name}
                                                </Link>
                                               </li>
                                            ))
                                        }
                                    </ul>
                                    </div>
                                </>)
                                :   <></>
                            }
                        </li>
                        </Slide>
                        </>
                        ))}
                    </ul>
                </div>
                </div>
                <div className=' menuicons align-items-center' style={{zIndex:510}}>
                {!isOpen?<i className="fa-solid menuicon fa-bars" onClick={()=>handleMenu()}></i>:<i className="fa-solid menuicon fa-x" onClick={()=>handleMenu()}></i>}
                </div>
            </div>
    </div>
    
    </>
   
  )
}
const getUserDetails = ()=>{

}

export default Navbar