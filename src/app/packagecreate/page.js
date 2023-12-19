"use client"
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import AddRegion from '../comonents/AddRegionDropDown'
import AddRegionDropDown from '../comonents/AddRegionDropDown'
import OutsideAlerter from '../comonents/submenu'
import { useRouter } from 'next/navigation'
import axios from '../api/axios'

export const revalidate = 0

const PageCreate = (props) => {
  const [options, setOptions] = useState([{ "label": "hrloo", "value": "hrloo" }]);
  const [countryoptions, setCountryOptions] = useState([]);
  const [modal, setModal] = useState(false)
  const [regionName, setRegionName] = useState()
  const [countryName, setCountryName] = useState()
  const router = useRouter()
  const [selectedRegion, onSelect] = useState();
  const [selectedCountry, setSCountryN] = useState();
  const [packageTitle,setTitle] = useState();
  const [startingPrice,setStartingPrice] = useState();
  const [noOfDays,setNoOfDays] = useState();
  const [noOfCities,setNoOfCities] = useState();
  const [imageFile,setImageFile] = useState();

  const addRegion = async () => {
    console.log(regionName, "regi")
    await fetch("/api/package/addRegion", { method: "POST", body: JSON.stringify({ "regionName": regionName }), headers: { 'Content-Type': 'application/json' } })

    await updateRegions("/api/package/getRegion", "Region");
  }


  const addPackage = async ()=>{
    
    const form = new FormData()
    form.append("image",imageFile)
    const response =  await fetch("/api/utils/file",{method:"POST",body:form});
    const res = await response.json();

    

    await fetch("/api/package/addPackage",{method:"POST",body:JSON.stringify({"packageTitle":packageTitle,"packagePricing":startingPrice, "noOfDays":noOfDays,"noOfCities":noOfCities,"packageFeatureImage":res.imgPath})})
  }


  const addCountry = async () => {
    console.log(regionName, "regi")
    await fetch("/api/package/addCountry", { method: "POST", body: JSON.stringify({ "countryName": countryName }), headers: { 'Content-Type': 'application/json' } })

    await updateCountry("/api/package/getCountry", "Country");
  }

  const [modalF, setModalF] = useState()

  const updateRegions = async (apiUrl, type) => {
    console.log("Fetching Data")
    const reponse = await fetch(apiUrl, { method: "GET", next: { revalidate: 0 } })
    const opt = await reponse.json();
    console.log(opt, "OPT")
    let opts = []
    if (type == "Region") {
      opt.data.map(el => {
        opts.push({ "label": el.region_name, "value": el.region_id })
      })
      setOptions(opts)
    }
    else if (type == "Country") {
      opt.data.map(el => {
        opts.push({ "label": el.country_name, "value": el.country_id })
      })
      setCountryOptions(opts)
    }
    console.log("Adding Data")

  }


  const updateCountry = async (apiUrl, type) => {
    console.log("Fetching Data")
    const reponse = await fetch(apiUrl, { method: "GET", next: { revalidate: 0 } })
    const opt = await reponse.json();
    console.log(opt, "OPT")
    let opts = []

    opt.data.map(el => {
      opts.push({ "label": el.country_name, "value": el.country_id })
    })
    setCountryOptions(opts)

  }


  useLayoutEffect(() => {

    const get = async () => {

      const opt = await getOptions();
      const copt = await getCountries();
      console.log(opt, "OPT")
      let opts = []
      let copts = []

      copt.data.map(el => {
        copts.push({ "label": el.country_name, "value": el.country_id })
      })
      opt.data.map(el => {
        opts.push({ "label": el.region_name, "value": el.region_id })
      })

      setOptions(opts)
      setCountryOptions(copts);
    }
    return () => get()
    //  setOptions(getOptions())

  }, [])


  const ModalContent = ({ content }) => {
    switch (content) {
      case "Region":
        return (<div className='bg-white p-4 rounded-4 d-flex align-items-center' style={{ width: "400px", height: "200px" }}>
          <div className='d-flex w-100'>
            <input onChange={(e) => setRegionName(e.target.value)} value={regionName} type="text" className='input-group inputField' placeholder='Add Region Name' />
          </div>
        </div>)
      // case "Country":
      //   return( <div className='bg-white p-4 rounded-4 d-flex align-items-center' style={{width:"400px",height:"200px"}}>
      //     <div className='d-flex w-100'>
      //       <input onChange={(e)=>setCountryName(e.target.value)} value={countryName} type="text" className='input-group inputField' placeholder='Add Country Name' onKeyDown={async(event)=>{event.key==="Enter"?addCountry():{}}} />
      //     </div>
      // </div>)

    }
  }

  return (
    <div className='container w-100 h-100 d-flex flex-column  align-items-center mt-3'>
      
      <div className='d-flex flex-column w-100 row-gap-2' style={{ maxWidth: "760px" }}>
        <div className='w-100 d-flex column-gap-2  position-relative'>
        <div className='position-relative' style={{ width: "200px",zIndex:2 }}>
          <div className='inputLabel'>
            Country
          </div>
          <AddRegionDropDown options={countryoptions} setModal={setModal} onSelect={setSCountryN} type={"Country"} setModalF={setModalF} placeholder={"Select Country"} helperText={"Add Country"} />
        </div>

        <div className='position-relative' style={{ width: "200px",zIndex:2 }}>
          <div className='inputLabel'>
            Region
          </div>
          <AddRegionDropDown options={options} setModal={setModal} onSelect={onSelect} type={"Region"} setModalF={setModalF} placeholder={"Select Region"} helperText={"Add Region"} />
        </div>



        {modal && (
          <div className='w-100 h-100 position-fixed d-flex justify-content-center align-items-center modal top-0' style={{ left: 0, display: "block", backgroundColor: "rgb(0,0,0,0.75)" }}>
            <OutsideAlerter setModal={setModal}>
              {
                modalF == "Region" ? (<div className='bg-white p-4 rounded-4 d-flex align-items-center' style={{ width: "400px", height: "200px" }}>
                  <div className='d-flex w-100'>
                    <input onChange={(e) => setRegionName(e.target.value)} value={regionName} type="text" className='input-group inputField' placeholder='Add Region Name' onKeyDown={async (event) => { event.key === "Enter" ? addRegion() : {} }} />
                  </div>
                </div>) : (<div className='bg-white p-4 rounded-4 d-flex align-items-center' style={{ width: "400px", height: "200px" }}>
                  <div className='d-flex w-100'>
                    <input onChange={(e) => setCountryName(e.target.value)} value={countryName} type="text" className='input-group inputField' placeholder='Add Country Name' onKeyDown={async (event) => { event.key === "Enter" ? addCountry() : {} }} />
                  </div>
                </div>)
              }
            </OutsideAlerter>
          </div>
        )}

        <div className='w-100'>
          <div className='inputLabel'>
            Package Title
          </div>
          <input onChange={(e)=>setTitle(e.target.value)} type="text" className='inputField w-100' placeholder='Enter Package Title' />

        </div>
        </div>
        <div className='w-100 d-flex column-gap-2  position-relative'>
        <div className='position-relative' style={{ width: "100px" }}>
          <div className='inputLabel'>
            No Of Days
          </div>
          <input className='inputField' onChange={(e)=>setNoOfDays(e.target.value)} placeholder='Days' style={{width:"100px"}}/>
        </div>

        <div className='position-relative' style={{ width: "100px" }}>
          <div className='inputLabel'>
            No Of Cities
          </div>
          <input className='inputField' placeholder='Cities' onChange={(e)=>setNoOfCities(e.target.value)} style={{width:"100px"}}/>
        </div>


        {modal && (
          <div className='w-100 h-100 position-fixed d-flex justify-content-center align-items-center modal top-0' style={{ left: 0, display: "block", backgroundColor: "rgb(0,0,0,0.75)" }}>
            <OutsideAlerter setModal={setModal}>
              {
                modalF == "Region" ? (<div className='bg-white p-4 rounded-4 d-flex align-items-center' style={{ width: "400px", height: "200px" }}>
                  <div className='d-flex w-100'>
                    <input onChange={(e) => setRegionName(e.target.value)} value={regionName} type="text" className='input-group inputField' placeholder='Add Region Name' onKeyDown={async (event) => { event.key === "Enter" ? addRegion() : {} }} />
                  </div>
                </div>) : (<div className='bg-white p-4 rounded-4 d-flex align-items-center' style={{ width: "400px", height: "200px" }}>
                  <div className='d-flex w-100'>
                    <input onChange={(e) => setCountryName(e.target.value)} value={countryName} type="text" className='input-group inputField' placeholder='Add Country Name' onKeyDown={async (event) => { event.key === "Enter" ? addCountry() : {} }} />
                  </div>
                </div>)
              }
            </OutsideAlerter>
          </div>
        )}

        <div className='w-100'>
          <div className='inputLabel'>
            Select Cities
          </div>
          <input type="text" className='inputField w-100' placeholder='Select Cities' />

        </div>
        <div className='w-100'>
          <div className='inputLabel'>
            Starting Price
          </div>
          <input type="text" onChange={(e)=>setStartingPrice(e.target.value)} className='inputField w-100' placeholder='Enter Starting Price' />

        </div>
        </div>
        <div className='w-100'>
          <div className='inputLabel'>
            Select Banner Image
          </div>
          <input type="file" onChange={(e)=>setImageFile(e.target.files[0])} className='inputField w-100' placeholder='Enter Starting Price' />

        </div>

      </div>
      
              <button className='btn btn-outline-primary mt-4' onClick={()=>addPackage()}>
                Add Package
              </button>
    </div>
  )
}

export default PageCreate


const getOptions = async () => {
  const reponse = await fetch("/api/package/getRegion", { next: { revalidate: 0 } })

  const opt = await reponse.json();
  return opt
}

const getCountries = async () => {
  const reponse = await fetch("/api/package/getCountry", { next: { revalidate: 0 } })

  const opt = await reponse.json();
  return opt
}

