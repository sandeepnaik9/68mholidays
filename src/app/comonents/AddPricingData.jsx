import React from 'react'
import CustomInput from './SuggestInput'
import { roomTypeData } from '../..//constants/roomType'
import { setPricingS } from '../../store/slices/packageSlice'
import { useAppDispatch, useAppSelector } from '../../store/stores'

const AddPricingData = ({ roomType, setRoomType,isEditing, setSelected, price, numberValidation, setPrice, setPricing, pricing }) => {
    
    const dispatch = useAppDispatch()


    const addPrice = () => {
        const existing =  pricing.find(el=>el.roomType==roomType)
        if(!existing){
            if (roomType != "" || price != "") {
                setPricing([...pricing, { "roomType": roomType, "price": price }])
                dispatch(setPricingS([...pricing, { "roomType": roomType, "price": price }]))
                setRoomType("")
                setPrice("")
            }
        }
        else{
            const update = pricing.map((el)=>{
                if(el.roomType===roomType){
                    return {...el,"price":price}
                }else{
                    return el
                }
            })
            setPricing(update)
            dispatch(setPricingS(update))
            setRoomType("")
            setPrice("")
        }
    }

    const removePrice = (rt)=>{
        const update = []
        pricing.map(el=>{
            if(el.roomType!=rt){
                console.log(el)
                update.push(el)
            }
        })
        
        setPricing(update)
        dispatch(setPricingS(update))
    }

    return (
        <>
            <div>
                <div>
                    <div>
                        Detailed Tour price
                    </div>
                    <div style={{ color: "#7A7A7A", fontWeight: '300', fontSize: "12px" }}>
                        Prices & discounts are Per Person for Indian Nationals only.
                    </div>
                </div>
                {isEditing&&(<div className='d-flex  mb-3' style={{ fontWeight: "500", fontSize: "14px" }}>
                    <div className='d-flex w-100 rounded-4 priceHead'>
                        <div className='col-5 d-flex align-items-center'>
                            <CustomInput suggestions={roomTypeData} setSelected={setRoomType} inputValue={roomType} setInputValue={setRoomType} placeholder={"Select Room Type"} />
                        </div>
                        <div className='col-5 text-center d-flex align-items-center' style={{ borderLeft: "1px solid #C4C4C4" }}>
                            <input className='aEdit' onChange={(e) => numberValidation(e, setPrice)} value={price} placeholder={"Base Price"} />
                        </div>
                    </div>
                    <div className='col-1'>
                        <div className='d-flex justify-content-center align-items-center bg-green-300 p-3 rounded-circle' onClick={() => addPrice()} style={{ fontSize: "18px", width: "22px", height: "22px", cursor: "pointer" }} >
                            +
                        </div>

                    </div>
                </div>)}
                <div className='rounded-3' style={{ border: "1px solid #C4C4C4" }}>
                    <div className='d-flex align-items-center rounded-top-3 priceHead' style={{ fontWeight: "500", fontSize: "14px", borderBottom: "1px solid #C4C4C4" }}>
                        <div className={`col-${isEditing?"5":"6"}`}>
                            Room Type
                        </div>
                        <div className={`col-${isEditing?"5":"6"} text-center`} style={{ borderLeft: "1px solid #C4C4C4" }}>
                            Basic Price
                        </div>
                        {isEditing&&(<div className='col-2'>
                            <button className="noselect d-flex justify-content-center" style={{background:"transparent",border:"none",outline:"none",boxShadow:"none",cursor:"default"}}></button>
                            </div>)}
                    </div>
                    {pricing && pricing.map((el,i) => {
                        console.log(i==pricing.length,i,pricing.length)
                        return (<div className={`d-flex priceRow ${(i==pricing.length-1)&& "rounded-bottom-3"}`} style={{ fontSize: "14px" }}>
                            <div className={`col-${isEditing?"5":"6"}`} style={{ fontWeight: "300" }}>
                                {el.roomType}
                            </div>
                            <div className={`col-${isEditing?"5":"6"} text-center`} style={{ borderLeft: "1px solid #C4C4C4" }}>
                                ₹ {el.price}
                            </div>
                            {isEditing&&(<div className='col-2'>
                            <button className="noselect d-flex justify-content-center" onClick={()=>{removePrice(el.roomType)}}><span className="text text-white d-flex justify-content-center align-items-center">-</span></button>
                            </div>)}
                        </div>)
                    })}

                </div>

                
            </div>
            <ul style={{fontSize:"12px",marginTop:"10px"}}>
                    <li>Terms and Conditions apply.</li>
<li>5% GST is applicable on given tour price.</li>
<li>Mentioned tour prices are Per Person for Indian Nationals only.</li>
                    </ul>
        </>
    )
}

export default AddPricingData