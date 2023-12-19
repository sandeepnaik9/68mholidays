"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import sI from '../../public/assets/route.png'
import clock from '../../public/assets/clock.png'
import suv from '../../public/assets/car.png'
import hotel from '../../public/assets/hotel.png'
import Tree from '../../public/assets/tree.svg'
import Right from '../../public/assets/lg-right-i.svg'
import ICenter from '../../public/assets/lg-center-i.svg'
import World from './comonents/WorldMap'

import Coffee from '../../public/assets/icon-cup-color.svg'
import CalendarI from '../../public/assets/icon-calendar-color.svg'
import OutsideAlerter from './comonents/submenu'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Snowfall from 'react-snowfall'
const Home = () => {
    const router = useRouter()
    // const navigate = useNavigate();
    const [subSearch,setSearchSub] = useState(false)
    const [subCalendar,setCalendar] = useState(false)
    const [loading, setLoadin] = useState(true);
    const svgref = useRef();
    const pathRefs = useRef([]);
    const [Name, setName] = useState();
    const [typeMO,setMonthROccasion] = useState("Month");
    const nameConRef = useRef();

    const [year,setYear] = useState("2023")

    const homePageTopPlaces = [
        {
            "place": "Dubai",
            "img": "http://www.68mholidays.com/uploads/locations/Dubai_15.jpg"
        },
        {
            "place": "Singapore",
            "img": "http://www.68mholidays.com/uploads/locations/Sin_12.jpg"
        },
        {
            "place": "Srilanka",
            "img": "http://www.68mholidays.com/uploads/locations/38.png"
        },
        {
            "place": "Thailand",
            "img": "http://www.68mholidays.com/uploads/locations/36.png"
        }


    ]

    const [filterYear,setFilterYear] = useState([])

    const month = [
        {
            "Month":"January",
            "inNumber":"01",
            "MonthCode":"Jan",
            "Year":"2023"
        },
        {
            "Month":"Februaury",
            "inNumber":"02",
            "MonthCode":"Feb",
            "Year":"2023"
        },
        {
            "Month":"March",
            "inNumber":"03",
            "MonthCode":"Mar",
            "Year":"2023"
        },
        {
            "Month":"April",
            "inNumber":"04",
            "MonthCode":"Apr",
            "Year":"2023"
        },
        {
            "Month":"May",
            "inNumber":"05",
            "MonthCode":"May",
            "Year":"2023"
        },
        {
            "Month":"June",
            "inNumber":"67",
            "MonthCode":"Jun",
            "Year":"2023"
        },
        {
            "Month":"July",
            "inNumber":"07",
            "MonthCode":"Jul",
            "Year":"2023"
        },
        {
            "Month":"August",
            "inNumber":"08",
            "MonthCode":"Aug",
            "Year":"2023"
        },
        {
            "Month":"September",
            "inNumber":"09",
            "MonthCode":"Sep",
            "Year":"2023"
        },
        {
            "Month":"October",
            "inNumber":"10",
            "MonthCode":"Oct",
            "Year":"2023"
        },
        {
            "Month":"November",
            "inNumber":"11",
            "MonthCode":"Nov",
            "Year":"2023"
        },
        {
            "Month":"December",
            "inNumber":"12",
            "MonthCode":"Dec",
            "Year":"2023"
        },
        {
            "Month":"January",
            "inNumber":"01",
            "MonthCode":"Jan",
            "Year":"2024"
        },
        {
            "Month":"Februaury",
            "inNumber":"02",
            "MonthCode":"Feb",
            "Year":"2024"
        },
        {
            "Month":"March",
            "inNumber":"03",
            "MonthCode":"Mar",
            "Year":"2024"
        },
        {
            "Month":"April",
            "inNumber":"04",
            "MonthCode":"Apr",
            "Year":"2024"
        },
        {
            "Month":"May",
            "inNumber":"05",
            "MonthCode":"May",
            "Year":"2024"
        },
        {
            "Month":"June",
            "inNumber":"06",
            "MonthCode":"Jun",
            "Year":"2024"
        },
        {
            "Month":"July",
            "inNumber":"07",
            "MonthCode":"Jul",
            "Year":"2024"
        },
        {
            "Month":"August",
            "inNumber":"08",
            "MonthCode":"Aug",
            "Year":"2024"
        },
        {
            "Month":"September",
            "inNumber":"09",
            "MonthCode":"Sep",
            "Year":"2024"
        },
        {
            "Month":"October",
            "inNumber":"10",
            "MonthCode":"Oct",
            "Year":"2024"
        },
        {
            "Month":"November",
            "inNumber":"11",
            "MonthCode":"Nov",
            "Year":"2024"
        },
        {
            "Month":"December",
            "inNumber":"12",
            "MonthCode":"Dec",
            "Year":"2024"
        },
        

    ]

    

    const handleMouseOver = useCallback((i) => {
        console.log("Sending notification")
        new Notification("Hello World!",{body:"Hello this is test notification"});
        if (nameConRef.current) {

            nameConRef.current.style.opacity = 1;

            if (!pathRefs.current[i].getAttribute("title")) {
                nameConRef.current.style.opacity = 0
            }
            setName(pathRefs.current[i].getAttribute("title"))
        }




    }, [pathRefs, nameConRef]
    )

    // Navigating to Multistep form on clicking svg 
    const handleMouseClick = useCallback((i) => {
      console.log(i,"Handle Cloick")
        if (pathRefs.current[i]) {
            const name = pathRefs.current[i].getAttribute("title")
            router.push(`/MultiStepForm/${name}`)
        }
    }, [Name])

    
    const handleMouseOut = useCallback((i) => {

        if (nameConRef.current) {
            nameConRef.current.style.opacity = "0";
        }
    }, [nameConRef])


    useEffect(() => {
        if ("Notification" in window) {
            console.log("The Notifications API is supported");
        }
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("The user accepted");
            }
        });

       
        
        //Used for changing the position of coutry name label 
        const uns = () => {
            let x;
            let y;
            window.onmousemove = (j) => {
                x = j.clientX;
                y = j.clientY;
                if (nameConRef.current) {
                    nameConRef.current.style.top = -120 + y + "px";
                    nameConRef.current.style.left = -80 + x + "px";
                }
            }
        }
        //
        // if (svgref.current) {
        //     const svg = svgref?.current;
        //     const zoom = (direction) => {
        //         const { scale, x, y } = getTransformParameters(svg);
        //         let dScale = 0.1;
        //         if (direction == "out") dScale *= -1;
        //         if (scale == 0.1 && direction == "out") dScale = 0;
        //         svg.style.transform = getTransformString(scale + dScale, x, y);
        //     };

        //     const getTransformString = (scale, x, y) =>
        //         "scale(" + scale + ") " + "translateX(" + x + "%) translateY(" + y + "%)";

        //     const getTransformParameters = (element) => {
        //         const transform = element.style.transform;
        //         let scale = 1,
        //             x = 0,
        //             y = 0;
        //         if (transform.includes("scale"))
        //             scale = parseFloat(transform.slice(transform.indexOf("scale") + 6));
        //         if (transform.includes("translateX"))
        //             x = parseInt(transform.slice(transform.indexOf("translateX") + 11));
        //         if (transform.includes("translateY"))
        //             y = parseInt(transform.slice(transform.indexOf("translateY") + 11));
        //         return { scale, x, y };
        //     };
        //     //   document.getElementById("left-button").onclick = () => pan("left");
        //     // document.getElementById("right-button").onclick = () => pan("right");

        //     const pan = (direction) => {
        //         const { scale, x, y } = getTransformParameters(svg);
        //         let dx = 0,
        //             dy = 0;
        //         switch (direction) {
        //             case "left":
        //                 dx = -3;
        //                 break;
        //             case "right":
        //                 dx = 3;
        //                 break;
        //             case "up":
        //                 dy = -3;
        //                 break;
        //             case "down":
        //                 dy = 3;
        //                 break;
        //         }
        //         svg.style.transform = getTransformString(scale, x + dx, y + dy);
        //     };


        // }
        //Clearing the event

        return uns()
    }, [])

    // ------- Start USED FOR ANIMATING SEARCH BAR AND SVG  -------- //

    const handleScroll = ()=>{
      
            const position = window.scrollY;
            if (position > 6) {
                if(document.querySelector(".tree")){
              document.querySelector(".tree").classList.add("scrolled")
              document.querySelector(".celebration").classList.add("scrolled")
              document.querySelector(".celebration2").classList.add("scrolled")
              document.querySelector(".searchbar").classList.add("scrolled")}
            }
            else {
                if(document.querySelector(".tree")){
                document.querySelector(".tree").classList.remove("scrolled")
                document.querySelector(".celebration").classList.remove("scrolled")
                document.querySelector(".celebration2").classList.remove("scrolled")
                document.querySelector(".searchbar").classList.remove("scrolled")}
            }
        
     
    }

    // ------- End USED FOR ANIMATING SEARCH BAR AND SVG  -------- //

    useEffect(()=>{

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };

    },[handleScroll])

    return (
        <div className='container-fluid p-0'>
            <div className='position-relative headerc overflow-hidden' style={{ zIndex: 9, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                {/* <div className='position-absolute  top-0 d-flex flex-column justify-content-center align-items-center text-white w-100 h-100' style={{zIndex:"9999"}}>  
                <h1><span className='hassle'>Welcome to</span> 68M Holidays </h1>
                <div className='searchBtnB d-flex align-items-center mt-3' style={{cursor:"pointer"}}>
                    <div className='searchBtn d-flex align-items-center p-3 bg-white w-100 h-100'>
                    <i className="fa-solid fa-magnifying-glass me-3"></i>
                            <div>Search countries, Cities</div>
                    </div>
                </div>
            </div> */}
            <Tree className="tree" style={{position:"absolute",left:0}}/>
            <Right className="celebration" style={{position:"absolute",right:"10px"}}/>
            <ICenter className="celebration2" style={{position:"absolute"}}/>
            <Snowfall snowflakeCount={200}/>
            
                
                <div className='container d-flex flex-column align-items-center position-relative justify-content-center'>
                <div ref={nameConRef} style={{ position: "absolute", padding: "20px", borderRadius: "20px", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)", zIndex: 99, border: "1px solid rgba(0,0,0,0.1)", margin: "20px", backgroundColor: "white", opacity: 0 }}>
                    {Name}
                </div>

                    <World setName={setName} svgref={svgref} pathRefs={pathRefs} handleMouseClick={handleMouseClick} handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} Name={Name}  className="svgworld" style={{ width: "100%", height: "100%", objectFit: "cover" }}  />
                        <div className='rounded-pill searchbar bg-white justify-content-center  d-flex align-items-center column-gap-3' style={{position:"absolute",border:"5px solid #0081c6",boxShadow:"0px 10px 15px -3px rgba(0,0,0,0.1)"}}>
                        <div className='position-relative' ><i className="fa-solid fa-location-dot"></i><input typeof='text' className='searchcountrycity' onFocus={()=>{setSearchSub(!subSearch)}} autoFocus={false} autoComplete='false' style={{outline:"none",border:"none"}} placeholder='Where you want to travel'/>
                            {subSearch?
                            <>
                            <OutsideAlerter setSub={setSearchSub} sub={subSearch}>
                                 <div className='position-absolute subsearcglocation flex-column row-gap-4 justify-content-center p-3' style={{width:"140%", backgroundColor:"white",borderRadius:"16px",bottom:"60px"}}>
                                 <div className='d-flex align-items-center column-gap-2'>
                                         <div className='iconSub d-flex justify-content-center align-items-center rounded-circle' style={{backgroundColor:"#F3F3F3",width:"50px",height:"50px"}}>
                                             <Coffee />
                                         </div>
                                         <div>
                                         Best season tours
                                         </div>
                                 </div>
                                 <div>
                                     <div style={{fontWeight:"300",fontSize:"10px"}}>
                                         Popular Destinations
                                     </div>
                                     <div className='row ps-3 row-gap-2 mt-2'>
                                         <div className='p-2 rounded-3 col-3 border border-1'>
                                             Europe
                                         </div>
                                         <div className='p-2 rounded-3 col-3 border border-1'>
                                             Europe
                                         </div>
                                         <div className='p-2 rounded-3 col-3 border border-1'>
                                             Europe
                                         </div>
                                         <div className='p-2 rounded-3 col-3 border border-1'>
                                             Europe
                                         </div>
                                     </div>
                                 </div>
                             </div>
                            </OutsideAlerter>
                             </>
                            :<></>
                            }
                               
                        </div>
                         <div className='d-flex column-gap-3 position-relative align-items-center' style={{borderLeft:"1px solid black",paddingLeft:"20px"}}><div onClick={()=>setCalendar(!subCalendar)}><i className="fa-regular fa-calendar"></i> Month</div>
                         {subCalendar?
                            <>
                            <OutsideAlerter setSub={setCalendar} sub={subCalendar}>
                                 <div className='position-absolute subsearcglocation flex-column row-gap-4 justify-content-center p-3' style={{width:"440%",left:0, backgroundColor:"white",borderRadius:"16px",bottom:"60px"}}>
                                 <div className='rounded-pill border border-1 d-flex w-100'>
                                    <div className='d-flex p-3 w-100 searchSelect month active rounded-pill justify-content-center align-items-center' onClick={()=>{document.querySelector(".searchSelect.month").classList.add("active");document.querySelector(".searchSelect.occasion").classList.remove("active");setMonthROccasion("Month")}}>
                                        Month
                                    </div>
                                    <div className='d-flex p-3 w-100 justify-content-center searchSelect occasion rounded-pill align-items-center' onClick={()=>{document.querySelector(".searchSelect.month").classList.remove("active");document.querySelector(".searchSelect.occasion").classList.add("active");setMonthROccasion("Occasion")}}>
                                        Ocassion
                                    </div>
                                 </div>
                                 <div>
                                    
                                    {typeMO=="Month"?
                                            (<>
                                            <div>
                                        <div className='row m-2  column-gap-3'>
                                            <div className='col-3 rounded-3 justify-content-center border p-2 d-flex' onClick={()=>{setYear("2023");setFilterYear(month.filter(el=>el.Year==="2023"))}}>
                                                Y 2023
                                            </div>
                                            <div className='col-3 rounded-3 p-2 d-flex justify-content-center border' onClick={()=>setYear("2024")}>
                                                Y 2024
                                            </div>
                                        </div>
                                    </div>
                                                <div className='row column-gap row-gap-1 container mt-3'>
                                                        
                                                        {filterYear.map(el=>
                                                            (<>
                                                                 <div key={el.MonthCode} className='col-2'>
                                                        <div className=' d-flex justify-content-center searchMonBtn '>{el.MonthCode}</div>
                                                        </div>
                                                            </>)
                                                            )}
                                                        
                                                        
                                                </div>
                                            </>)
                                    :(<>
                                        <div>
                                            <div className='d-flex align-items-center column-gap-2 my-2' style={{fontSize:"14px"}}>
                                                <img src={CalendarI} />
                                                Festival
                                            </div>
                                            <div className='d-flex align-items-center justify-content-center border col-6 px-3 py-2'>
                                                
                                                New Year Celebration
                                            </div>
                                        </div>
                                        <div>
                                            <div className='d-flex my-2 align-items-center column-gap-2'>
                                            <Image src={CalendarI} />
                                                Long Weekend
                                            </div>
                                            <div className='d-flex align-items-center justify-content-center border col-6 px-3 py-2'> 
                                                Christmas Celebration
                                            </div>
                                        </div>

                                    </>)
                                    }
                                 </div>
                             </div>
                            </OutsideAlerter>
                             </>
                            :<></>
                            }
                         </div>
                          <div className='d-flex column-gap-3 align-items-center' style={{borderLeft:"1px solid black",paddingLeft:"20px"}}><span className='p-1 border border-1 d-flex justify-content-center align-items-center border-black rounded-circle' style={{width:"20px",height:"20px"}}>₹</span> Budget</div>
                          
                        </div>
                </div>

                {/* <div className='position-absolute homeTop top-0 d-flex justify-content-center align-items-center text-white w-100 h-100'>  
            </div> */}

            </div>
            
            {/* <Image src={Tree} width={300} height={200} /> */}
            <section className='container-fluid homesecond p-0 m-0'>
            <div className='d-flex flex-column justify-content-center align-items-center  container' style={{ paddingTop: "150px", marginBottom: "100px" }}>
                <h3 >
                    HOW WE DO
                </h3>
                <div className='row'>
                    <div className='col-lg-3 col-md-6 d-flex flex-column'>
                        <div className='d-flex justify-content-center mb-3'>
                            <Image src={sI} style={{width:"50px",height:"50px"}} alt="" />
                        </div>
                        <div className='text-center'>
                            <h4>Structured Itinerary</h4>
                            <p>A well planned itineraries to make your trip memorable by balacing your travel time.</p>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 d-flex flex-column'>
                        <div className='d-flex justify-content-center mb-3'>
                            <Image src={clock} style={{width:"50px",height:"50px"}} alt="" />
                        </div>
                        <div className='text-center'>
                            <h4>Round The clock Support</h4>
                            <p>Dedicated Tour manager support will be provided over the phone inorder to give clear assistance during the trip.</p>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 d-flex flex-column'>
                        <div className='d-flex justify-content-center mb-3'>
                            <Image src={suv} style={{width:"50px",height:"50px"}} alt="" />
                        </div>
                        <div className='text-center'>
                            <h4>Dedicated vehicle</h4>
                            <p>To ensure a safe journey, safe vehicles with trusted drivers accompany you during your entire trip.</p>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 d-flex flex-column'>
                        {/* <div className='d-flex justify-content-center mb-3'>
                        <img src={hotel} width={"50px"} height={"50px"} alt="" />
                        <button id="left-button" >Left</button>
                        <button id="right-button" >Right</button>
                        <button id="up-button" >Up</button>
                        <button id="down-button" >Down</button>
                        <button id="zoom-in-button" >Zoom In</button>
                        <button id="zoom-out-button" >Zoom Out</button>

                    </div> */}
                        <div className='d-flex justify-content-center mb-3'>
                            <Image src={hotel} style={{width:"50px",height:"50px"}} alt="" />
                        </div>
                        <div className='text-center'>
                            <h4>Verified Hotels</h4>
                            <p>Accommodation in verified hotels with good ambience and hygienic rooms which lifts your holiday spirit.</p>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            <div className=' d-flex container flex-column justify-content-center align-items-center my-5'>
                <h3 className='text-center'>
                    Top Places to Visit in the World
                </h3>
                <div className='row column-gap  m-md-3 d-flex justify-content-center mt-5'>
                    {homePageTopPlaces.map((el) => {
                        return (
                            <Link key={el.place} href={`/MultiStepForm/${el.place}`} className='col-lg-3 col-md-6'>
                                <div className=' contentwr position-relative' style={{ borderRadius: "20px", boxShadow: "4px 5px 37px -5px rgba(0,0,0,0.62)", cursor: "pointer" }}>
                                    <div>
                                        <div className='imgwr' style={{ backgroundImage: "url('http://www.68mholidays.com/uploads/locations/Sin_12.jpg')", backgroundRepeat: "no-repeat", objectFit: "cover" }}>
                                            <img src={el.img}   style={{ objectFit: "cover", height:"100%",width:"100%" }} alt="" />
                                        </div>
                                        <div className='position-absolute flex-column contentimg d-flex justify-content-center align-items-center text-white' style={{ backgroundColor: "rgba(0,0,0,0.34)", backdropFilter: " blur(5px)", borderRadius: "20px" }}>
                                            <h2 className='text-center titleCard' >
                                                {el.place}
                                            </h2>
                                            <h4 className='contentimg text-center '>
                                                Fares from Rs. 10000
                                            </h4>
                                        </div>

                                    </div>

                                </div>



                            </Link>
                        )
                    })}






                </div>
            </div>
        </div>
    )
}

export default Home