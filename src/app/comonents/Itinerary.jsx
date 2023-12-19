import React from 'react'

const Itinerary = ({}) => {

    const addKeyHighlights = ()=>{
        console.log(keyHighlight)
        if(keyHighlight?.length){
            setKeyHighlights([...keyHighlights,keyHighlight])}

    }

  return (
    <div className='p-2'>
        <div>Key Highlights</div>
        <hr />
        {isEditing&&(<div className='d-flex  mb-3' style={{ fontWeight: "500", fontSize: "14px" }}>
                    <div className='d-flex w-100 rounded-4 priceHead'>
                        <div className='col-11 text-center d-flex align-items-center' >
                            <input className='aEdit w-100' value={keyHighlight} onChange={(e)=>setKeyHighlight(e.target.value)} placeholder='Add Key Highlights ' />
                        </div>
                    </div>
                    <div className='col-1'>
                        <div className='d-flex justify-content-center align-items-center bg-green-300 p-3 rounded-circle' onClick={() => addKeyHighlights()} style={{ fontSize: "18px", width: "22px", height: "22px", cursor: "pointer" }} >
                            +
                        </div>

                    </div>
                </div>)}
        <ul>
            {keyHighlights.map(el=><li className='mb-3 fw-light'>{el}</li>)}
        </ul>
        <div>
            <div className='d-flex' style={{fontSize:"12px"}}>
        <div style={{fontWeight:"500"}}>Note:</div> <div>The highlights and sightseeing's may change depending on the departure date you choose.</div>
        </div>
        </div>
    </div>
    
  )
}

export default Itinerary