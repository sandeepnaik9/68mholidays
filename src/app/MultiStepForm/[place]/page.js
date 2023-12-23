"use client"
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/react-fontawesome';
import { useParams, useRouter } from 'next/navigation';
import { Calendar } from 'primereact/calendar';
import { airportData } from '../../../constants/airportData';
import { months } from '../../../constants/airportData';
import ModalFields from '../../comonents/modalFields';

//theme

// import couple from './public/assets/travel_with_partner.png'
// import family from './public/assets/travel_with_family.png'
// import friends from './public/assets/travel_with_friends.png'
// import solo from './public/assets/travel_with_myself.png'

// import tT5 from './public/assets/3-5.jpg'
// import sT8 from './public/assets/6-8.jpg'
// import nT11 from './public/assets/9-11.jpg'
// import tT15 from './public/assets/12-15.jpg'

import "primereact/resources/themes/lara-light-indigo/theme.css";


import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
;
import OutsideAlerter from '../../comonents/submenu';
function MultiStepForm({ params }) {


  const router = useRouter();
  // const [airportData, setairportData] = useState();
  // const naviagte = useNavigate();
  const [filterairports, setFilter] = useState([]);

  // const [months,setMonths] = useState();

  const [datesdata, setDatesData] = useState([{
    "month": "November",
    "inNumber": "11",
    "year": "2023",
    "temp": "22 / 27°C",
    "selected": false
  },
  {
    "month": "December",
    "inNumber": "12",
    "year": "2023",
    "temp": "23 / 29°C",
    "selected": false
  },
  {
    "month": "January",
    "inNumber": "01",
    "year": "2024",
    "temp": "24 / 30°C",
    "selected": false

  },
  {
    "month": "February",
    "inNumber": "02",
    "year": "2024",
    "temp": "25 / 30°C",
    "selected": false
  },
  {
    "month": "March",
    "inNumber": "03",
    "year": "2024",
    "temp": "25 / 30°C",
    "selected": false
  },
  {
    "month": "April",
    "inNumber": "04",
    "year": "2024",
    "temp": "25 / 29°C",
    "selected": false
  },
  {
    "month": "May",
    "inNumber": "05",
    "year": "2024",
    "temp": "23 / 28°C",
    "selected": false
  },
  {
    "month": "June",
    "inNumber": "06",
    "year": "2024",
    "temp": "21 / 26°C",
    "selected": false
  },
  {
    "month": "July",
    "inNumber": "07",
    "year": "2024",
    "temp": "19 / 25°C",
    "selected": false
  },

  ]);

  const [daysRange, setDaysRange] = useState([
    { "range": "3-5", "imgSrc": "/assets/3-5.jpg", "selected": false },
    { "range": "6-8", "imgSrc": '/assets/6-8.jpg', "selected": false },
    { "range": "9-11", "imgSrc": '/assets/9-11.jpg', "selected": false },
    { "range": "12-15", "imgSrc": '/assets/12-15.jpg', "selected": false },

  ])

  const [paxTypes, setPaxTypes] = useState([
    {"type":"Couple","rooms":1,"adults":2,"children":0,"imgSrc":"/assets/travel_with_partner.png"},
    {"type":"Family","rooms":1,"adults":2,"children":0,"imgSrc":"/assets/travel_with_family.png"},
    {"type":"Friends","rooms":1,"adults":2,"children":0,"imgSrc":"/assets/travel_with_friends.png"},
    {"type":"Solo","rooms":1,"adults":2,"children":0,"imgSrc":"/assets/travel_with_myself.png"},    
  ])

  const [roomCount,setRoomCount] = useState(1);

  const [roomsInf, setRoomsInf] = useState([{
    "room": 1,
    "Adults": 2,
    "children": [
      {
        "child": 1,
        "childAge": "17"
      },
      {
        "child":2,
        "childAge":"<1 Year"
      }
    ]
  }
  ]
  )





  const [step, setStep] = useState(1);

  const [date, setDate] = useState()
  const [place, setPlace] = useState();
  const [ismSelected, setMSelected] = useState(false);
  const [isDateSelected, setDateSelected] = useState(false);
  const [airportSelected, setairportSelected] = useState(false);
  const [modal,setModal] = useState(false);

  const serchref = useRef();


  const [selected, setSelected] = useState([{ "place": "", "Month": "", "year": "", "inNumber": "", "date": "", "daysRange": "" }]);



  const changeDate = (value) => {
    setDate(value);
    console.log(value)
    const da = value.split("\/");

    var date_d;
    var date_m;
    var date_y;
    date_d = da[0];
    date_m = da[1];
    date_y = da[2];


    if (da[0].length == 1) {
      date_d = "0" + da[0]
    }
    console.log(date_m, "date")
    const date_mn = months[date_m - 1]


    const updatedSelection = datesdata.map(el => {
      if (el.month == date_mn) {
        return { ...el, selected: !el.selected }
      }
      return { ...el, selected: false }
    })
    setDatesData(updatedSelection)
    setSelected([{ ...selected[0], "Month": date_mn, "year": date_y, "inNumber": date_m, "date": date_d }])
    console.log([{ ...selected[0], "Month": date_mn, "year": date_y, "inNumber": date_m, "date": date_d }])
    setDateSelected(!isDateSelected)
    document.querySelector(".p3").classList.add("completed")
    setStep(3);
  }


  const searchChange = (e) => {
    const filterdata = airportData.filter(el => el.AirportName.toLowerCase().includes(e.target.value) || el.AirportName.toLowerCase().includes(e.target.value));

    setFilter(filterdata)

  }

  const selectDaysRange = (selectedDa) => {
    setSelected([{ ...selected[0], "daysRange": selectedDa }])
    const updatedSelection = daysRange.map(el => {
      if (selectedDa == el.range) {
        return { ...el, selected: !el.selected }
      }
      return { ...el, selected: false }

    })
    document.querySelector(".p5").classList.add("completed")
    setModal(true);
    setDaysRange(updatedSelection);
  }

  const selectDate = useCallback((month, number, year) => {
    document.querySelector(".p2").classList.add("completed")
    const updatedSelection = datesdata.map(el => {
      if (el.month == month) {
        return { ...el, selected: !el.selected }
      }
      return { ...el, selected: false }
    })
    setDatesData(updatedSelection)
    console.log([{ ...selected[0], "place": `${params.place}`, "Month": month, "year": year, "inNumber": number }])


    setMSelected(true);
    setSelected([{ ...selected[0], "place": `${params.place}`, "Month": month, "year": year, "inNumber": number, "Acode": "", "Aname": "", "date": "", "daysRange": "" }])
    setStep(2);

  }, [])


  const selectAirport = (code, name) => {
    setSelected([{ ...selected[0], "Aname": name, "Acode": code }])
    console.log([{ ...selected[0], "Aname": name, "Acode": code }])
    document.querySelector(".p4").classList.add("completed")

    setStep(4)
  }

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;

    if (position > 50) {
      document.querySelector(".headers").classList.add("fixeds")
    }
    else {
      document.querySelector(".headers").classList.remove("fixeds")
    }

  };


  const first = () => (<><div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>
    Which month are you traveling?
  </div>
    <div className='d-flex flex-wrap mt-5 text-center' style={{ columnGap: "8px", rowGap: "8px" }}>

      {datesdata.map((el) => (

        <div key={el.inNumber + el.month} onClick={() => { selectDate(el.month, el.inNumber, el.year) }} className={`cardd d-flex flex-column justify-content-center align-content-center ${el.selected ? "completed" : ""}`}>
          <div className='text-center cardtext' style={{ fontSize: "18px" }}>
            {el.month}
          </div>
          <div className='text-center cardsubtext'>
            {el.temp}
          </div>
        </div>


      ),
      )}
    </div></>

  );



  const second = () =>
  (<><div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>
    When is your departure date?
  </div> <div className='d-flex justify-content-center mt-5'><Calendar viewDate={new Date(`${selected[0].year}-${selected[0].inNumber}`)} value={date} onChange={(e) => changeDate(e.value.toLocaleDateString())} inline showWeek /></div></>)




  const third = () =>
  (<>

    <div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>
      Where are your travelling from?
    </div>
    <div className='position-sticky' style={{ top: 80, backgroundColor: "rgb(247, 248, 251)" }}>
      <div className='d-flex  mt-3 p-2 align-items-center bg-white searchbar'>
        <div>
          <i className="fa-solid fa-magnifying-glass ms-3" style={{ fontSize: "20px", color: "#888888" }}></i>
        </div>
        <div className='w-100'>
          <input ref={serchref} onChange={(e) => searchChange(e)} className='form-control p-0 ps-2' placeholder='Search airports' type="text" />
        </div>
      </div>
    </div>
    <div className='ps-5 mt-4 ' style={{ fontSize: "22px", fontWeight: "600" }}>
      {filterairports.length ? filterairports.map(el => (
        <div key={el.AirportCode+el.AirportName} style={{ cursor: "pointer" }} onClick={() => selectAirport(el.AirportCode, el.AirportName)} className='mt-2 d-flex justify-content-between align-items-center airporthover'>
          <div>{el.AirportName}, {el.AirportCode}</div><div className='selAirText' style={{ fontWeight: "700", fontSize: "16px" }}>Select Airport <i className="fa-solid fa-angle-right"></i></div></div>)) : airportData.map(el => (
            <div key={el.AirportCode+el.AirportName} style={{ cursor: "pointer" }} onClick={() => selectAirport(el.AirportCode, el.AirportName)} className='mt-2 d-flex justify-content-between align-items-center airporthover'>
              <div>{el.AirportName}, {el.AirportCode}</div><div className='selAirText' style={{ fontWeight: "700", fontSize: "16px" }}>Select Airport <i className="fa-solid fa-angle-right"></i></div></div>))}


    </div>
  </>);

  const fourth = () => (
    <>

      <div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>What's the duration of your holiday?</div>
      <div className='container d-flex justify-content-center align-items-center flex-center '>
        {daysRange.map(el => (<div className=' d-flex flex-column m-2 justify-content-center align-items-center' style={{ width: "1000px", height: "250px" }}>
          <div className={`d-flex w-100 h-100 flex-column  justify-content-center align-items-between daysRangeCard ${el.selected ? "selected" : ""}`} onClick={() => selectDaysRange(el.range)}>
            <div className='d-flex justify-content-center'>
              <img style={{ borderRadius: "50%", width: "128px", height: "128px" }} src={el.imgSrc} />
            </div>
            <div className="w-100 text-center mt-4">
              {el.range} Days
            </div>
          </div>
        </div>))}

      </div>

    </>
  )

  const fifth = () => (
    <>

      <div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>Who is travelling with you?</div>
      <div className='container d-flex justify-content-center align-items-center flex-center '>
        {paxTypes.map(el => (<div className=' d-flex flex-column m-2 justify-content-center align-items-center' style={{ width: "1000px", height: "250px" }}>
          <div className={`d-flex w-100 h-100 flex-column  justify-content-center align-items-between daysRangeCard ${el.selected ? "selected" : ""}`} onClick={() => selectDaysRange(el.range)}>
            
            <div className='d-flex justify-content-center'>
              <img width={128} height={128} style={{ borderRadius: "50%", width: "128px", height: "128px" }} src={el.imgSrc} />
            </div>
            <div className="w-100 text-center mt-4">
              {el.type} Days
            </div>
          </div>
        </div>))}

      </div>

    </>
  )

  const handleClick = (activeStep) => {
    switch (activeStep) {
      case 1:
        setStep(activeStep)
        document.querySelector(".p1").classList.add("completed");
        document.querySelector(".p2").classList.remove("completed");
        document.querySelector(".p3").classList.remove("completed");
        document.querySelector(".p4").classList.remove("completed");
        document.querySelector(".p5").classList.remove("completed");
        return
      case 2:
        setStep(activeStep - 1)
        document.querySelector(".p1").classList.add("completed");
        document.querySelector(".p2").classList.remove("completed");
        document.querySelector(".p3").classList.remove("completed");
        document.querySelector(".p4").classList.remove("completed");
        document.querySelector(".p5").classList.remove("completed");
        return
      case 3:
        setStep(activeStep)
        document.querySelector(".p1").classList.add("completed");
        document.querySelector(".p2").classList.add("completed");
        document.querySelector(".p3").classList.add("completed");
        document.querySelector(".p4").classList.remove("completed");
        document.querySelector(".p5").classList.remove("completed");
        return
      case 4:
        setStep(activeStep)
        document.querySelector(".p1").classList.add("completed");
        document.querySelector(".p2").classList.add("completed");
        document.querySelector(".p3").classList.add("completed");
        document.querySelector(".p4").classList.add("completed");
        document.querySelector(".p5").classList.remove("completed");
        return
      case 5:
        setStep(activeStep)
        document.querySelector(".p1").classList.add("completed");
        document.querySelector(".p2").classList.add("completed");
        document.querySelector(".p3").classList.add("completed");
        document.querySelector(".p4").classList.add("completed");
        document.querySelector(".p5").classList.add("completed");
        return

    }
  }


  const handleDropDownCount = useCallback((e)=>{
    console.log(e.target.classList.contains("selected"))
    if(e.target.classList.contains("selected")){
      e.target.classList.remove("selected")
    }
    else{
      e.target.classList.add("selected")
    }
  },[])

  const renderForm = () => {
    switch (step) {
      case 1:
        console.log("First")
        return first();
      case 2:
        return second();
      case 3:
        return third();
      case 4:
        return fourth();
      case 5:
        return fifth();

    }
  }

  const setPla = useCallback(() => {

  },)

  useEffect(() => {

    setSelected([{ ...selected[0], "place": params.place }])

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div className='container formsection m-0 ms-auto me-auto d-flex flex-column ' style={{ height: "90vh", paddingTop: "50px" }}>
      {modal&&(
         <div className='w-100 h-100 position-fixed d-flex justify-content-center align-items-center modal top-0' style={{left:0,display:"block",backgroundColor:"rgb(0,0,0,0.75)"}}>
            <OutsideAlerter setModal={setModal}>
              <div className='bg-white p-4 rounded-4' style={{width:"400px",height:"500px"}}>
                  <div>
                    How to configure your rooms?
                  </div>
                  <div>
                    {roon}
                  </div>
              </div>
            </OutsideAlerter>
         </div>
      )}
      <div>
        Now planning your holiday to
      </div>
      <div className='headers' style={{ position: "sticky", top: "0px" }}>
        <div className='selectedoptions'>
          <div className='d-flex'>

            {selected[0]["place"] != undefined ? <div className='p-2 d-flex justify-content-between align-content-center align-items-center me-1 sbtn rounded-3 border' onClick={() => router.push("/")} style={{ columnGap: "8px" }}>
              {selected[0]["place"]} <span><i className="fa-regular fa-circle-xmark" style={{ cursor: 'pointer', fontSize: "12px" }}></i></span>
            </div> : <></>}

            {
              selected[0].Month ? (<div className='p-2 d-flex justify-content-between align-content-center me-1 sbtn rounded-3 border' style={{ columnGap: "8px" }} onClick={() => { handleClick(2) }}>
                {selected[0]["Month"]} <span className='day'>{selected[0].date}</span>
              </div>) : (<></>)

            }
            {
              selected[0]["Acode"] ? (<div className='p-2 d-flex justify-content-between align-content-center me-1 sbtn rounded-3 border' style={{ columnGap: "8px" }} onClick={() => { handleClick(3) }}>
                {selected[0]["Acode"]}
              </div>) : (<></>)
            }
            {
              selected[0]["daysRange"] ? (<div className='p-2 d-flex justify-content-between align-content-center me-1 sbtn rounded-3 border' style={{ columnGap: "8px" }} onClick={() => { handleClick(4) }}>
                {selected[0]["daysRange"]} Days
              </div>) : (<></>)
            }
          </div>

          {/* <div className='p-2 me-1 sbtn rounded-3 border'>
                            Mauritius <span><i className="fa-regular fa-circle-xmark" style={{cursor:'pointer'}}></i></span>
                          </div>
                          <div className='p-2 me-1 sbtn rounded-3 border'>
                            Mauritius <span><i className="fa-regular fa-circle-xmark" style={{cursor:'pointer'}}></i></span>
                          </div>
                          <div className='p-2 me-1 sbtn rounded-3 border'>
                            Mauritius <span><i className="fa-regular fa-circle-xmark" style={{cursor:'pointer'}}></i></span>
                          </div>
                          <div className='p-2 me-1 sbtn rounded-3 border'>
                            Mauritius <span><i className="fa-regular fa-circle-xmark" style={{cursor:'pointer'}}></i></span>
                          </div>
                          <div className='p-2 me-1 sbtn rounded-3 border'>
                            Mauritius <span><i className="fa-regular fa-circle-xmark" style={{cursor:'pointer'}}></i></span>
                          </div>
                          <div className='p-2 me-1 sbtn rounded-3 border'>
                            Mauritius <span><i className="fa-regular fa-circle-xmark" style={{cursor:'pointer'}}></i></span>
                          </div>
                          <div className='p-2 me-1 sbtn rounded-3 border'>
                            Mauritius <span><i className="fa-regular fa-circle-xmark" style={{cursor:'pointer'}}></i></span>
                          </div>
                          <div className='p-2 me-1 sbtn rounded-3 border'>
                            Mauritius <span><i className="fa-regular fa-circle-xmark" style={{cursor:'pointer'}}></i></span>
                          </div> */}

        </div>
      </div>
      <div className='d-flex '>
        <div className='progresss p1 completed'>

        </div>
        <div className='progresss p2 '>

        </div>
        <div className='progresss p3 '>

        </div>
        <div className='progresss p4 '>

        </div>
        <div className='progresss p5 '>

        </div>
        <div className='progresss p6 '>

        </div>
        <div className='progresss p7 '>

        </div>





      </div>

      <div>

        {"place" ? renderForm() : "Loading"}


        {/* {!ismSelected && !isDateSelected && !airportSelected ? (<><div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>
          Which month are you traveling?
        </div>
          <div className='d-flex flex-wrap mt-5 text-center' style={{ columnGap: "8px", rowGap: "8px" }}>

            {datesdata.map((el) => (

              <div onClick={() => { selectDate(el.month, el.inNumber, el.year) }} className={el.selected ? 'cardd d-flex flex-column justify-content-center align-content-center completed' : 'cardd d-flex flex-column justify-content-center align-content-center'}>
                <div className='text-center cardtext' style={{ fontSize: "18px" }}>
                  {el.month}
                </div>
                <div className='text-center cardsubtext'>
                  {el.temp}
                </div>
              </div>


            ),
            )
            }



          </div></>) : !ismSelected && !isDateSelected && !airportSelected ? (<><div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>
            When is your departure date?
          </div> <div className='d-flex justify-content-center mt-5'><Calendar viewDate={new Date(`${selected[0].year}-${selected[0].inNumber}`)} value={date} onChange={(e) => changeDate(e.value.toLocaleString())} inline showWeek /></div></>) : (<>

            <div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>
              Where are your travelling from?
            </div>
            <div className='position-sticky' style={{ top: 80, backgroundColor: "rgb(247, 248, 251)" }}>
              <div className='d-flex  mt-3 p-2 align-items-center bg-white searchbar'>
                <div>
                  <i className="fa-solid fa-magnifying-glass ms-3" style={{ fontSize: "20px", color: "#888888" }}></i>
                </div>
                <div className='w-100'>
                  <input ref={serchref} onChange={(e) => searchChange(e)} className='form-control p-0 ps-2' placeholder='Search airports' type="text" />
                </div>
              </div>
            </div>
            <div className='ps-5 mt-4 ' style={{ fontSize: "22px", fontWeight: "600" }}>
              {filterairports.length? filterairports.map(el => (
              <div style={{ cursor: "pointer" }} className='mt-2 d-flex justify-content-between align-items-center airporthover'>
                <div>{el.AirportName}, {el.AirportCode}</div><div className='selAirText' style={{ fontWeight: "700", fontSize: "16px" }}>Select Airport <i className="fa-solid fa-angle-right"></i></div></div>)) : airportData.map(el => (
              <div style={{ cursor: "pointer" }} className='mt-2 d-flex justify-content-between align-items-center airporthover'>
                <div>{el.AirportName}, {el.AirportCode}</div><div className='selAirText' style={{ fontWeight: "700", fontSize: "16px" }}>Select Airport <i className="fa-solid fa-angle-right"></i></div></div>))}


            </div>
          </>)

        } */}
      </div>
    </div>
  );
}

export default MultiStepForm;
