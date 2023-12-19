import React from 'react'
import CustomInput from './SuggestInput'
import { countries } from '../../constants/airportData'
import Select from "react-select"
const AddDestination = ({ inputValue, setInputValue, destinations, groupBy, nights, setNights, handleCountry, removeCountry, handlePlace, removePlace, setPlaceInputValue, selectedCountry, setAddC, setSelectedCountry, setPlaces, places, placeinputValue }) => {
    return (<>
        <div className='d-flex justify-content-center align-items-center'>
            <div className='d-flex mt-3  mb-3' style={{ fontWeight: "500", fontSize: "14px" }}>
                <div className='d-flex w-100 rounded-4 priceHead'>
                    <div className='col-4 d-flex align-items-center'>
                        <Select options={countries} setAddC={setAddC} onChange={(d) => { setInputValue(d["label"]) }} classNames={{
                            control: (state) =>
                                'aEdit',
                        }} setSelected={setSelectedCountry} setPlaces={setPlaces} placeholder={"Search Country"} />
                    </div>
                    <div className='col-4 text-center d-flex align-items-center' style={{ borderLeft: "1px solid #C4C4C4" }}>
                        <CustomInput suggestions={places} inputValue={placeinputValue} setInputValue={setPlaceInputValue} placeholder={"Search Destination"} setAddC={setAddC} setSelected={setSelectedCountry} />
                    </div>
                    <div className='col-4 text-center d-flex align-items-center' style={{ borderLeft: "1px solid #C4C4C4" }}>
                        <input type="text" className='aEdit' placeholder='No of Nights' value={nights} onChange={(e) => setNights(e.target.value)} style={{ minWidth: "80px", maxWidth: "90px" }} />
                    </div>
                </div>
                <div className='col-1'>
                    <div onClick={() => handleCountry()} className='d-flex justify-content-center align-items-center bg-green-300 p-3 rounded-circle' style={{ fontSize: "18px", width: "22px", height: "22px", cursor: "pointer" }} >
                        +
                    </div>

                </div>
            </div>


        </div>

        <div className='px-4 mt-2 pt-3'>
            {Object.entries(groupBy(destinations, "country")).map(el => (<>
                <div className='d-flex align-items-center'>
                    <div key={el[0]} className='col-3 d-flex align-items-center' >{el[0]}</div>
                    <div onClick={() => removeCountry(el[0])} className='rounded-circle d-flex text-white justify-content-center align-items-center' style={{ width: "20px", height: "20px", background: "red", cursor: "pointer" }}>
                        -
                    </div>
                </div>

                {el[1].map(e => (<>
                    <div className='d-flex justify-content-between'>
                        <div className='row w-100 column-gap-3'>
                            <div key={e.place} className="ms-3 col-4">{e.place}</div>
                            <div className='col-3'>({e.nights}N)</div>
                            <div className='col-3'>
                                <div onClick={() => removePlace(el[0], e.place)} className='rounded-circle d-flex text-white justify-content-center align-items-center' style={{ width: "20px", height: "20px", background: "red", cursor: "pointer" }}>
                                    -
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
                )
                }
            </>))
            }
        </div>
    </>)

}

export default AddDestination