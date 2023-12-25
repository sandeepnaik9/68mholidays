"use client"
import React, { useState } from 'react'


import Link from 'next/link'
import { useEffect } from 'react'
import { jwtDecrypt, jwtVerify } from 'jose'
import { usePathname, useRouter } from 'next/navigation'
import { setAuth, setMobileNumber, setRole, setusername } from '../../store/slices/authSlice'
import { useAppDispatch,useAppSelector } from '../../store/stores'
import { setIsEditing } from '../../store/slices/packageSlice'

const Navbar =  () => {

   const path = usePathname();
   const isAuth = useAppSelector((state) => state.auth.isAuth);
    const [isAuthenticated,setIsuthenticated] = useState(false)
    const dispatch = useAppDispatch();
    const router = useRouter()
    useEffect(() => {
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
                "name":"Bali",
                "path":""
            },
            {
                "name":"Dubai",
                "path":""
            },
            {
                "name":"Europe",
                "path":""
            },
            {
                "name":"Greece",
                "path":""
            },
            {
                "name":"Australia",
                "path":""
            },
            {
                "name":"Maldives",
                "path":""
            },
            {
                "name":"Mauritius",
                "path":""
            },
            {
                "name":"Sri Lanka Tour Packages",
                "path":""
            },
            {
                "name":"Thailand",
                "path":""
            },
            {
                "name":"Thailand",
                "path":""
            },
            {
                "name":"Thailand",
                "path":""
            },
            {
                "name":"Thailand",
                "path":""
            },
            {
                "name":"Thailand",
                "path":""
            },
            {
                "name":"Thailand",
                "path":""
            },
            {
                "name":"Thailand",
                "path":""
            },


        
        ]
        },
        {
            "main":"Honeymoon Getaways",
            "path":"/package/2c169c93-5536-48ee-af95-2d0291e81a53",
            "sub":[
              
            ]
        },
        {
            "main":"Packages by Interest",
            "sub":[
                
            ]
        },
        {
            "main":"Packages by City",
            "sub":[
              
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
    <div className='container-fluid bg-black main-menu-nav'>
            <div className='container d-flex justify-content-between align-items-center p-4'>
                <Link href="/" className='logo'>
                    <img src={"/assets/logo-2.png"} alt="" />
                </Link>
                <div className='mainmenu'>
                    
                    <ul className='d-flex align-items-center m-0 navigationmain column-gap-5'>
                        {navbardata.map(el=>
                        (
                        <li key={el.main} className={el.sub?"position-relative navhover":"navhover"} onClick={(e)=>handleSubmenu(e)}>
                            {el.path?(<>{<Link href={el.path} onClick={()=>{el.main==="Login"&&isAuthenticated&&logoutFunction();handleMenu()}} className={el.main=="Login"?"btn text-white":""}>{el.main==="Login"&&isAuthenticated?"Logout":el.main}</Link>}</>):(<><div className='d-flex h-100 align-items-center column-gap-2'>{el.main} {el.sub.length?<span><i className="fa-solid fa-angle-down rotate" style={{color:"white",fontWeight:"600"}}></i></span>:""}</div></>)}
                            
                            
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
                        ))}
                        
                    </ul>
                </div>
                <div className=' menuicons align-items-center' style={{zIndex:510}}>
                {!isOpen?<i className="fa-solid menuicon fa-bars" onClick={()=>handleMenu()}></i>:<i className="fa-solid menuicon fa-x" onClick={()=>handleMenu()}></i>}
                </div>
            </div>
    </div>
   
  )
}
const getUserDetails = ()=>{

}

export default Navbar