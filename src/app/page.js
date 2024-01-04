"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import World from './comonents/WorldMap'
import { Fade, Slide, Reveal } from "react-awesome-reveal";
import { useRouter } from 'next/navigation';
import OutsideAlerter from './comonents/submenu';
import Coffee from '../../public/assets/icon-cup-color.svg'
import CalendarI from '../../public/assets/icon-calendar-color.svg'
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRatings from 'react-star-ratings';
import Link from 'next/link';
import Select from 'react-select'

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const nameConRef = useRef();
  const svgref = useRef();
  const pathRefs = useRef([]);
  const [Name, setName] = useState();
  const [subSearch, setSearchSub] = useState(false)
  const [subCalendar, setCalendar] = useState(false)
  const router = useRouter()

  const [packages,setPackages] = useState([
    {
      title:"Asian discovery",
      price:"₹ 70,000",
      img:"https://routehaven.boomdevstheme.com/wp-content/uploads/2023/11/img-1-1.jpg"
    },
    {
      title:"Mountain hiking tour",
      price:"₹ 60,000",
      img:"https://routehaven.boomdevstheme.com/wp-content/uploads/2023/11/img-19.jpg"
    },
    {
      title:"Adventure maldivs",
      price:"₹ 90,000",
      img:"https://routehaven.boomdevstheme.com/wp-content/uploads/2023/11/img-9.jpg"
    },
    {
      title:"Averest Tour",
      price:"₹ 65,000",
      img:"https://routehaven.boomdevstheme.com/wp-content/uploads/2023/11/img-2-1.jpg"
    },
    {
      title:"The minimalist sea",
      price:"₹ 95,000",
      img:"https://routehaven.boomdevstheme.com/wp-content/uploads/2023/11/img-3-1.jpg"
    },
    {
      title:"Antique europe",
      price:"₹ 95,000",
      img:"https://routehaven.boomdevstheme.com/wp-content/uploads/2023/11/img-4-2.jpg"
    }
    


    

  ])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  const settingsT = {
    customPaging: function (i) {
      return (
        <a>
          <img width={"100%"} src={`/assets/user-${i + 1}.png`} />
        </a>
      );
    },
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };


  const handleMouseClick = useCallback((i) => {
    console.log(i, "Handle Cloick")
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

  const handleMouseOver = useCallback((i) => {
    console.log("Sending notification")
    // if (ServiceWorker in navigator) {
    //   // navigator.serviceWorker.showNotifiction()
    // }
    new Notification("Hello World!", { body: "Hello this is test notification" });
    if (nameConRef.current) {

      nameConRef.current.style.opacity = 1;

      if (!pathRefs.current[i].getAttribute("title")) {
        nameConRef.current.style.opacity = 0
      }
      setName(pathRefs.current[i].getAttribute("title"))
    }




  }, [pathRefs, nameConRef]
  )



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


  return (
    <>
      <Fade triggerOnce>
        <section className='topSection' style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "80vh", backgroundPosition: "center top" }}>
          <div className='container d-flex flex-column align-items-center position-relative justify-content-center'>
            <div ref={nameConRef} style={{ position: "absolute", padding: "20px", borderRadius: "20px", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)", zIndex: 99, border: "1px solid rgba(0,0,0,0.1)", margin: "20px", backgroundColor: "white", opacity: 0 }}>
              {Name}
            </div>
            {/* <div className='pd' style={{ position: "absolute", left: 0 }}>
              Discover
            </div> */}

            <div style={{ position: "absolute", right: 10, top: 9 }}>
              <Fade triggerOnce>
                <Slide triggerOnce direction='left' className='position-relative'  >
                  <img src="/assets/smajli-landing-img-7.png" alt="" srcset="" />
                </Slide>
              </Fade>
            </div>


            <World setName={setName} svgref={svgref} pathRefs={pathRefs} handleMouseClick={handleMouseClick} handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} Name={Name} className="svgworld" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {/* <div className='rounded-pill searchbar bg-white justify-content-center  d-flex align-items-center column-gap-3' style={{position:"absolute",border:"5px solid #0081c6",boxShadow:"0px 10px 15px -3px rgba(0,0,0,0.1)"}}>
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
                                                <div className='row column-gap row-gap-1 container mt-3 w-100'>
                                                        
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
                                            <img src={CalendarI} />
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
                          
                        </div> */}

          <div style={{padding:"40px 24px",background:"#fff",boxShadow:"0px 24px 64px 0px rgba(199, 206, 218, 0.25) !important",zIndex:"99",marginTop:"80px"}}>
            <form action="">
              <div className='d-flex column-gap-4'>
                
                  <Select placeholder={(<div style={{fontSize:"18px"}}><i style={{color:"blue"}} className='fa-solid fa-location-dot'></i> Destination</div>)}/>
                  <Select placeholder={(<div style={{fontSize:"18px"}}><i style={{color:"blue"}} className='fa-solid fa-bicycle'></i> Activity</div>)}/>
                  <Select placeholder={(<div style={{fontSize:"18px"}}><i style={{color:"blue"}} className=' fa-regular fa-clock'></i> 0 Days - 7 Days</div>)}/>
                  <Select placeholder={(<div  style={{fontSize:"18px"}}><i style={{color:"blue"}} className='fa-solid rsCircle fa-indian-rupee-sign'></i> ₹ 30,000 - ₹ 15,00,000</div>)}/>
              </div>
            </form>
          </div>
          </div>
          
        </section>
        <section className='landingPage2' style={{ height: "90vh", background: "#F9F5F3", paddingTop: 100, paddingBottom: 100 }}>

          <div className='d-flex container'>

            <div>
              <div className='fancy'>
                Destination
              </div>

              <h1 className='headi position-relative'>

                Popular <span className='position-relative' style={{ color: "#f7694d" }}>Destiantions <img src="/assets/three-line-shape.png" alt="" srcset="" style={{ position: "absolute", top: "-20px", right: -40 }} /></span>
              </h1>
              <div style={{ marginTop: -20 }}>
                <img src="/assets/bottom-bar.png" width={"100%"} alt="" />
              </div>
            </div>
          </div>
          <div className='container famousTP'>

            <Slider {...settings}>

              {
                [0, 1, 2, 3, 4, 5].map(el => <Slide triggerOnce direction='up' delay={el + 1} cascade={true}>
                  <div >
                    <div className='w-100 cardD ms-3 h-100 position-relative'>
                      <div className="imgwrpr">
                        <img src="/assets/img-4-2.jpg" alt="" />
                      </div>
                      <div className='d-flex justify-content-center'>
                        <div className='bg-white textContainer d-flex justify-content-between align-items-center position-absolute rounded-4 p-3' style={{ width: "250px" }}>
                          <div>
                            Bali
                          </div>
                          <div className='bg-purple-400 rounded-3 text-white p-2'>
                            Read More
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>)
              }



            </Slider>

          </div>
        </section>
        <section style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <div className='container'>
            <div className='row'>


              <div className='col-md-12 col-lg-6'>
                <Slide triggerOnce>
                  <div className='d-flex'>


                    <div style={{ marginBottom: "20px" }}>

                      <div className='fancy'>
                        About us
                      </div>
                      <h2 className='headi'>
                        We create journeys for the excited traveler
                      </h2>
                      <div style={{ marginTop: -20 }}>
                        <img src="/assets/bottom-bar.png" width={"100%"} alt="" />
                      </div>

                    </div>
                  </div>
                  <div className='d-flex mt-3 align-items-center column-gap-3' style={{ marginBottom: "20px" }}>

                    <div className='iconCircleS d-flex justify-content-center align-items-center bg-white rounded-circle' >
                      <img src="/assets/folding-map.png" alt="" />
                    </div>
                    <div>
                      <h4>
                        Best of Hotel
                      </h4>
                      <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae itaque amet voluptatem sed maxime animi ex explicabo autem neque, tempora quia odio recusandae! Fuga sapiente officiis ducimus harum qui possimus!
                      </div>
                    </div>
                  </div>
                  <div className='d-flex mt-6 align-items-center column-gap-3' style={{ marginBottom: "40px" }}>
                    <div className='iconCircleS d-flex justify-content-center align-items-center bg-white rounded-circle' >
                      <img src="/assets/ticket.png" alt="" />
                    </div>
                    <div>
                      <h4>
                        World Class Travel
                      </h4>
                      <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae itaque amet voluptatem sed maxime animi ex explicabo autem neque, tempora quia odio recusandae! Fuga sapiente officiis ducimus harum qui possimus!
                      </div>
                    </div>
                  </div>
                  <hr style={{ display: "block", borderTop: "1px solid grey", height: "2px" }} />
                  <div className='d-flex align-items-center'>
                    <div>
                      <div className='ms-4 d-md-none my-3' style={{ fontWeight: "400", fontSize: "20px" }}>
                        <span style={{ fontWeight: "600" }}>170k+</span> Customers
                      </div>
                      <div className='rounded-3 d-flex justify-content-center align-items-center' style={{ paddingRight: "38px", paddingLeft: "38px", paddingTop: "17px", paddingBottom: "17px", background: "black", color: "white", cursor: "pointer" }}>
                        Learn More
                      </div>
                    </div>

                    <div className='d-inline-flex ms-5'>
                      <div className='image-inner'>
                        <img src="/assets/r-user-6.jpg" alt="" srcset="" />
                      </div>
                      <div className='image-inner'>
                        <img src="/assets/r-user-6.jpg" alt="" srcset="" />
                      </div>
                      <div className='image-inner'>
                        <img src="/assets/r-user-6.jpg" alt="" srcset="" />
                      </div>
                      <div className='image-inner' style={{ fontSize: "24px", color: "white" }}>
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      </div>

                    </div>
                    <div className='ms-4 d-none d-md-block' style={{ fontWeight: "400", fontSize: "20px" }}>
                      <span style={{ fontWeight: "600" }}>170k+</span> Customers
                    </div>
                  </div>
                </Slide>
              </div>

              <div className='col-6 d-none d-lg-block position-relative'>
                <Slide direction='right' triggerOnce>
                  <div className='position-relative'>



                    <img className='bg-shape' src="/assets/image-wrapper-bg-1.png" alt="" />




                    <div className='img-wrapper-c style-1'>
                      <img src="http://www.68mholidays.com/uploads/locations/Sin_12.jpg" width={"100%"} height={"100%"} style={{objectFit:"cover"}} alt="" />
                    </div>




                    <div className='img-wrapper-c style-2'>
                      <img src="/assets/img-3.jpg" alt="" srcset="" />
                    </div>
                  </div>
                </Slide>

              </div>

            </div>
          </div>

        </section>

        <section style={{ marginTop: "90px" }}>
          <div className='container'>
            <div className='d-flex'>
              <div>
                <div className='fancy'>
                  Popular Packages
                </div>

                <h1 className='headi position-relative'>

                  Find Popular  Tours
                </h1>
                <div style={{ marginTop: -20 }}>
                  <img src="/assets/bottom-bar.png" width={"100%"} alt="" />
                </div>
              </div>

            </div>
            <div className='d-flex flex-wrap  row-gap-3 align-items-center justify-content-center'>
              <Slide damping={0.2} cascade direction='up' triggerOnce  >
                {packages.map((el) => <div className=''>
                  <div className='card rounded-4 overflow-hidden' style={{cursor:"pointer"}}>
                    <div className='card-img-top'>
                      <img src={el.img} width={"100%"} height={"100%"} style={{objectFit:"cover"}} />
                    </div>
                    <div className='card-boddy priceCard  container p-5'>
                      <h4 className=''>{el.price}/-</h4>
                      <h4 className='packageT'>
                        {el.title}
                      </h4>
                      <hr />
                      <div className='d-flex column-gap-5'>
                        <div className='d-flex column-gap-3'>
                          <div>
                            <i class="fa-solid fa-location-dot"></i>
                          </div>
                          <div className='cardText'>
                            Morocco
                          </div>
                        </div>
                        <div className='d-flex column-gap-3'>
                          <div>
                            <i class="fa-solid fa-clock"></i>
                          </div>
                          <div className='cardText'>
                            4 Days
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                
               
              </Slide>
              <Fade>
                <div className='d-flex mt-5'>
                    <div className='rounded-3 d-flex justify-content-center align-items-center' style={{ paddingRight: "38px", paddingLeft: "38px", paddingTop: "17px", paddingBottom: "17px", background: "black", color: "white", cursor: "pointer" }}>
                      Load More
                    </div>
                  </div>
                </Fade>
              
            </div>
          </div>
        </section>
        <section style={{ paddingTop: "100px", paddingBottom: "100px", marginTop: '80px', background: "#F9F8F7" }}>
          <div className="container">
            <div className='row'>
              <Slide className='col-4' triggerOnce>
                <div >
                  <div className='fancy'>
                    Why choose us
                  </div>
                  <h3 className='fw-bolder fs-1'>
                    Get the best <br />travel experience <br /> with 68M Holidays
                  </h3>
                  <div style={{ marginTop: "-20px" }}>
                    <img src="/assets/bottom-bar.png" width={"100%"} alt="" />
                  </div>
                  <div className='desc'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis numquam delectus sapiente minima blanditiis.
                  </div>
                  <div className='d-flex mt-5'>
                    <div className='rounded-3 d-flex justify-content-center align-items-center' style={{ paddingRight: "38px", paddingLeft: "38px", paddingTop: "17px", paddingBottom: "17px", background: "black", color: "white", cursor: "pointer" }}>
                      Learn More
                    </div>
                  </div>
                </div>
              </Slide>
              <div className='col-4 '>
                <img className='floating' src="/assets/choose-us-img-1.png" alt="" />
              </div>
              <Slide className='col-4' direction='right' triggerOnce>
                <div className=' container'>
                  {[0, 1, 2].map(el => <>
                    <div className='d-flex mt-3  align-items-center column-gap-3' style={{ marginBottom: "20px" }}>

                      <div className='iconCircleS d-flex justify-content-center align-items-center bg-white rounded-circle' >
                        <img src="/assets/folding-map.png" alt="" />
                      </div>
                      <div>
                        <h4>
                          Tour Guide
                        </h4>
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                      </div>
                    </div>
                    {el != 2 && <hr style={{ color: "grey" }} />}
                  </>)}
                </div>
              </Slide>
            </div>
          </div>
        </section>
        <section style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <div className='container'>
            <div className='row'>
              <div className='col-6'>
                <div className='position-relative'>
                  <div className='img-wrpr'>
                    <div className='content'>
                    <span><i class="fa-solid fa-location-dot"></i> Colombia</span>
									
                    </div>
                    <img src="/assets/user-1.png" alt="" />
                  </div>
                  <div className='img-wrpr' style={{ position: "absolute", bottom: "-50px", right: "0%" }}>
                  <div className='content style-content-2'>
                    <span><i class="fa-solid fa-location-dot"></i> Istanbul</span>
									
                    </div>
                    <img src="/assets/user-2.png" alt="" />
                  </div>
                  <div className='img-wrpr' style={{ position: "absolute", bottom: "-300", left: 250 }}>
                  <div className='content '>
                    <span><i class="fa-solid fa-location-dot"></i> Russia</span>
									
                    </div>
                    <img src="/assets/user-3.png" alt="" />
                  </div>
                </div>
              </div>
              <div className='col-6 container'>
                <div className='d-flex'>
                  <div>
                    <div className='fancy'>
                      Testimonial
                    </div>
                    <h3 className='fw-bolder fs-1'>
                      What traveler say
                    </h3>
                    <div style={{ marginTop: "-20px" }}>
                      <img src="/assets/bottom-bar.png" width={"100%"} alt="" />
                    </div>

                  </div>
                </div>
                <div className='testimonials'>
                  <Slider {...settingsT}>
                    {[1, 2, 3].map((el) => (<>
                      <div className='w-100 d-flex flex-column p-3'>
                        <div style={{fontSize:"18px",fontWeight:"600"}}>
                          “Their service is absolutely wonderful and cheaper than the direct or any other booking site, You back to us strait away and no issues at all in the other end.”
                        </div>
                        <div className='mt-5'>
                          <StarRatings rating={5} starDimension="20px"
                            starSpacing="2px" starRatedColor="#FE712A" numberOfStars={5} />
                        </div>
                      </div>
                    </>)
                    )
                    }
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className='text-white' style={{background:"#041126",marginTop:"100px",paddingTop:"30px",paddingBottom:"100px"}}>
        <Slide className='' direction='up' triggerOnce>
          <div className='container'>
            <div className='row'>
              <div className='col-4'>
              
                <Link href="/" className='logo'>
                    {/* <img src={"/assets/logo-2.png"} alt="" /> */}
                    <div className='h5 text-white'>
                        <div className='d-flex flex-column align-items-center'><img src="logo.png" height={80} width={80} style={{objectFit:"contain"}} alt="" srcset="" /><div className='fs-3'><span style={{fontWeight:"300"}}>68</span><span style={{fontWeight:"700"}}>M</span> Holidays</div></div>
                    </div>
                </Link>
                

              </div>
              
              <div className='col-4'>
                <h4>About 68M Holidays</h4>
                <div style={{fontWeight:"200",fontSize:"16px",lineHeight:"25px"}}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt assumenda voluptas labore dignissimos nihil optio animi iste adipisci iusto. Deserunt quis eos pariatur quod dolor sit ab? Exercitationem, laborum consequatur.
                </div>
              </div>
              <div className='col-4'>
                <h4>Quick Links</h4>
                <ul className='footerMenu'>
                  <li>
                    <a href="">About</a>
                  </li>
                  <li>
                    <a href="">Tour</a>
                  </li>
                  <li>
                    <a href="">Destinations</a>
                  </li>
                  <li>
                    <a href="">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </Slide>
        </footer>
      </Fade >
    </>
  )
}

export default Home