import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/react-fontawesome';
import { Calendar } from 'primereact/calendar';
import { useNavigate, useParams } from 'react-router-dom';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";


import { useCallback, useEffect, useRef, useState } from 'react';
function MultiStepForm() {

    

  const [airportData, setairportData] = useState([
    { AirportCode: "BLR", AirportName: "Bengaluru" },
    { AirportCode: "TRV", AirportName: "Trivandrum" },
    { AirportCode: "DEL", AirportName: "Delhi" },
    { AirportCode: "CCU", AirportName: "Kolkata" },
    { AirportCode: "BOM", AirportName: "Mumbai" },
    { AirportCode: "MAA", AirportName: "Chennai" },
    { AirportCode: "HYD", AirportName: "Hyderabad" },
    { AirportCode: "JAI", AirportName: "Jaipur" },
    { AirportCode: "PNQ", AirportName: "Pune" },
    { AirportCode: "BBI", AirportName: "Bhubaneshwar" },
    { AirportCode: "PAT", AirportName: "Patna" },
    { AirportCode: "LKO", AirportName: "Lucknow" },
    { AirportCode: "IXU", AirportName: "Aurangabad" },
    { AirportCode: "CCJ", AirportName: "Kozhikode" },
    { AirportCode: "NAG", AirportName: "Nagpur" },
    { AirportCode: "COK", AirportName: "Kochi" },
    { AirportCode: "ATQ", AirportName: "Amritsar" },
    { AirportCode: "CJB", AirportName: "Coimbatore" },
    { AirportCode: "TRZ", AirportName: "Trichy" },
    { AirportCode: "IDR", AirportName: "Indore" },
    { AirportCode: "VNS", AirportName: "Varanasi" },
    { AirportCode: "IXM", AirportName: "Madurai" },
    { AirportCode: "GAU", AirportName: "Guwahati" },
    { AirportCode: "IXE", AirportName: "Mangalore" },
    { AirportCode: "BDQ", AirportName: "Vadodara" },
    { AirportCode: "VTZ", AirportName: "Visakhapatnam" },
    { AirportCode: "AMD", AirportName: "Ahmedabad" },
    { AirportCode: "RPR", AirportName: "Raipur" },
    { AirportCode: "IXC", AirportName: "Chandigarh" },
    { AirportCode: "UDR", AirportName: "Udaipur" },
    { AirportCode: "GOI", AirportName: "Goa" },
    { AirportCode: "IXR", AirportName: "Ranchi" },
    { AirportCode: "JDH", AirportName: "Jodhpur" },
    { AirportCode: "BKB", AirportName: "Bikaner" },
    { AirportCode: "KQH", AirportName: "Kishangarh" },
    { AirportCode: "CNN", AirportName: "Kannur" },
    { AirportCode: "TEZ", AirportName: "Tezpur" },
    { AirportCode: "IXB", AirportName: "Siliguri" },
    { AirportCode: "IMF", AirportName: "Imphal" },
    { AirportCode: "AJL", AirportName: "Aizwal" },
    { AirportCode: "MYQ", AirportName: "Mysore" },
    { AirportCode: "JRH", AirportName: "Jorhat" },
    { AirportCode: "DIB", AirportName: "Dibrugarh" },
    { AirportCode: "IXA", AirportName: "Agartala" },
    { AirportCode: "SHL", AirportName: "Shillong" },
    { AirportCode: "AGR", AirportName: "Agra" },
    { AirportCode: "DED", AirportName: "Dehradun" },
    { AirportCode: "KUU", AirportName: "Kullu" },
    { AirportCode: "IXZ", AirportName: "Port Blair" },
    { AirportCode: "ISK", AirportName: "Nashik" },
    { AirportCode: "IXL", AirportName: "Leh" },
    { AirportCode: "SXR", AirportName: "Srinagar" },
    { AirportCode: "BHJ", AirportName: "Bhuj" },
    { AirportCode: "IXJ", AirportName: "Jammu" },
    { AirportCode: "KNU", AirportName: "Fatehpur" },
    { AirportCode: "CDP", AirportName: "Kadapa" },
    { AirportCode: "STV", AirportName: "Surat" },
    { AirportCode: "VGA", AirportName: "Vijayawada" },
    { AirportCode: "IXY", AirportName: "Kandla" },
    { AirportCode: "JGA", AirportName: "Jamnagar" },
    { AirportCode: "PBD", AirportName: "Porbandar" },
    { AirportCode: "RAJ", AirportName: "Rajkot" },
    { AirportCode: "BKR", AirportName: "Bokaro" },
    { AirportCode: "JLR", AirportName: "Jabalpur" },
    { AirportCode: "IXW", AirportName: "Jamshedpur" },
    { AirportCode: "BEP", AirportName: "Bellary" },
    { AirportCode: "IXG", AirportName: "Belgaum" },
    { AirportCode: "GBI", AirportName: "Kalaburagi" },
    { AirportCode: "HBX", AirportName: "Hubli" },
    { AirportCode: "TNI", AirportName: "Satna" },
    { AirportCode: "YTL", AirportName: "Yavatmal" },
    { AirportCode: "NDC", AirportName: "Nanded" },
    { AirportCode: "KLH", AirportName: "Kolhapur" },
    { AirportCode: "SSL", AirportName: "Solapur" },
    { AirportCode: "JLG", AirportName: "Jalgaon" },
    { AirportCode: "AKD", AirportName: "Akola" },
    { AirportCode: "DMU", AirportName: "Dimapur" },
    { AirportCode: "JRG", AirportName: "Jharsuguda" },
    { AirportCode: "PYB", AirportName: "Jeypore" },
    { AirportCode: "PGH", AirportName: "Pantnagar" },
    { AirportCode: "LUH", AirportName: "Ludhiana" },
    { AirportCode: "KTU", AirportName: "Kota" },
    { AirportCode: "KNU", AirportName: "Kanpur" },
    { AirportCode: "GOP", AirportName: "Gorakhpur" },
    { AirportCode: "NNS", AirportName: "Pithoragarh" },
    { AirportCode: "RJA", AirportName: "Rajahmundry" },
    { AirportCode: "IXT", AirportName: "Pasighat" },
    { AirportCode: "PAB", AirportName: "Bilaspur" },
    { AirportCode: "DIU", AirportName: "Diu" },
    { AirportCode: "HSS", AirportName: "Hisar" },
    { AirportCode: "AIP", AirportName: "Jalandhar" },
    { AirportCode: "SAG", AirportName: "Shirdi" },
    { AirportCode: "AJL", AirportName: "Yavatmal" },
    { AirportCode: "KQH", AirportName: "Ajmer" },
    { AirportCode: "SSL", AirportName: "Solapur" },
    { AirportCode: "PYB", AirportName: "Jeypore" },
    { AirportCode: "BUP", AirportName: "Bathinda" },
    { AirportCode: "IXP", AirportName: "Pathankot" },
    { AirportCode: "PYG", AirportName: "Gangtok" },
    { AirportCode: "RGH", AirportName: "Balurghat" },
    { AirportCode: "NNS", AirportName: "Pithoragarh" },
    { AirportCode: "HDX", AirportName: "Ghaziabad" },
    { AirportCode: "SXV", AirportName: "Salem" },
    { AirportCode: "RDP", AirportName: "Durgapur" },
  ]);
  const naviagte = useNavigate();
  const [filterairports, setFilter] = useState([]);

  const [months,setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

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

  

  const [step,setStep] = useState(1);

  const [date, setDate] = useState()
  const {place} = useParams();
  const [ismSelected, setMSelected] = useState(false);
  const [isDateSelected, setDateSelected] = useState(false);
  const [airportSelected, setairportSelected] = useState(false);

  const serchref = useRef();


  const [selected, setSelected] = useState([{ "place": "", "Month": "", "year": "", "inNumber": "", "date": "" }]);


  const changeDate = (value) => {
    setDate(value);
    
    const da = value.split("\/");

    var date_d;
    var date_m;
    var date_y;
    date_d = da[0];
    date_m = da[1];
    date_y = da[2];

    setStep(3);
    if (da[0].length == 1) {
      date_d = "0" + da[0]
    }
    clipPath(date_m,"date")
    const date_mn = months[date_m-1]
    
    
    const updatedSelection = datesdata.map(el => {
        if (el.month == date_mn) {
          return { ...el, selected: !el.selected }
        }
        return  { ...el, selected: false}
      })
      setDatesData(updatedSelection)
    setSelected([{ ...selected[0], "Month": date_mn, "year": date_y, "inNumber": date_m, "date": date_d }])
    clipPath([{ ...selected[0], "Month": date_mn, "year": date_y, "inNumber": date_m, "date": date_d }])
    setDateSelected(!isDateSelected)
    document.querySelector(".p3").classList.add("completed")
    setStep(3);
  }


  const searchChange = (e) => {
    const filterdata = airportData.filter(el => el.AirportName.toLowerCase().includes(e.target.value) || el.AirportName.toLowerCase().includes(e.target.value));

    setFilter(filterdata)

  }


  const selectDate = useCallback((month, number, year) => {
    document.querySelector(".p2").classList.add("completed")
    const updatedSelection = datesdata.map(el => {
      if (el.month == month) {
        return { ...el, selected: !el.selected }
      }
      return {...el,selected: false}
    })
    setDatesData(updatedSelection)
    clipPath([{ ...selected[0], "place": `${place}`, "Month": month, "year": year, "inNumber": number }])

    
    setMSelected(true);
    setSelected([{ ...selected[0], "place": `${place}`, "Month": month, "year": year, "inNumber": number, }])
    setStep(2);

  }, [place])


  const selectAirport = (code,name)=>{
    setSelected([{ ...selected[0],"Aname":name,"Acode":code}])
    clipPath([{ ...selected[0],"Aname":name,"Acode":code}])
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

      <div onClick={() => { selectDate(el.month, el.inNumber, el.year) }} className={el.selected ? 'cardd d-flex flex-column justify-content-center align-content-center completed' : 'cardd d-flex flex-column justify-content-center align-content-center'}>
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
  


  const second = ()=>
     (<><div className='text-center mt-5 fw-bolder' style={{ fontSize: "18px" }}>
    When is your departure date?
  </div> <div className='d-flex justify-content-center mt-5'><Calendar viewDate={new Date(`${selected[0].year}-${selected[0].inNumber}`)} value={date} onChange={(e) => changeDate(e.value.toLocaleDateString())} inline showWeek /></div></>) 
  



  const third = ()=>
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
        {filterairports.length? filterairports.map(el => (
        <div style={{ cursor: "pointer" }} onClick={()=>selectAirport(el.AirportCode,el.AirportName)} className='mt-2 d-flex justify-content-between align-items-center airporthover'>
          <div>{el.AirportName}, {el.AirportCode}</div><div className='selAirText' style={{ fontWeight: "700", fontSize: "16px" }}>Select Airport <i className="fa-solid fa-angle-right"></i></div></div>)) : airportData.map(el => (
        <div style={{ cursor: "pointer" }} onClick={()=>selectAirport(el.AirportCode,el.AirportName)} className='mt-2 d-flex justify-content-between align-items-center airporthover'>
          <div>{el.AirportName}, {el.AirportCode}</div><div className='selAirText' style={{ fontWeight: "700", fontSize: "16px" }}>Select Airport <i className="fa-solid fa-angle-right"></i></div></div>))}


      </div>
    </>);


  const handleClick = (activeStep)=>{
    if(activeStep==1){
      document.querySelector(".p2").classList.remove("completed");
      document.querySelector(".p3").classList.remove("completed");

    }
    else{
      document.querySelector(".p3").classList.remove("completed");
    }
    document.querySelector(".p2").classList.remove("completed");
    document.querySelector(".p3").classList.remove("completed"); 
    setStep(activeStep); 
  }


  const renderForm = ()=>{
    switch (step){
      case 1:
        clipPath("First")
        return first();
      case 2:
        return second();
      case 3:
        return third();

    }
  }

  const setPla = useCallback(()=>{
    
  },)

  useEffect(() => {
    
    setSelected([{ ...selected[0], "place":place}])

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [place]);



  return (
    <div className='container formsection m-0 ms-auto me-auto d-flex flex-column ' style={{ height: "90vh",paddingTop:"140px"}}>

      <div>
        Now planning your holiday to
      </div>
      <div className='headers' style={{ position: "sticky", top: "0px" }}>
        <div className='selectedoptions'>
          <div className='d-flex'>

            {selected[0]["place"]!=undefined ? <div className='p-2 d-flex justify-content-between align-content-center align-items-center me-1 sbtn rounded-3 border' onClick={()=>naviagte("/")} style={{ columnGap: "8px" }}>
              {selected[0]["place"]} <span><i className="fa-regular fa-circle-xmark" style={{ cursor: 'pointer', fontSize: "12px" }}></i></span>
            </div> : <></>}

            {
                selected[0].Month?(<div className='p-2 d-flex justify-content-between align-content-center me-1 sbtn rounded-3 border' style={{ columnGap: "8px" }} onClick={() => {handleClick(1)}}>
                {selected[0]["Month"]} <span className='day'>{selected[0].date}</span>
              </div>):(<></>)
                
            }
            {
                selected[0]["Acode"]?(<div className='p-2 d-flex justify-content-between align-content-center me-1 sbtn rounded-3 border' style={{ columnGap: "8px" }} onClick={() => {handleClick(1)}}>
                {selected[0]["Acode"]}
              </div>):(<></>)
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

      {place?renderForm():"Loading"}
        
        
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
