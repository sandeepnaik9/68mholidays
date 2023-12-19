import React from 'react'

const ModalFields = ({room}) => {
  return (
   <>
   <div className='p-2 rId' onClick={(e)=>handleDropDownCount(e)}>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>
                          Room 1
                        </div>
                        <div className='d-flex justify-content-center align-items-center column-gap-3'>
                          
                        </div>
                      </div>
                    </div>
                    <div className='p-2 countPax'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>
                          Adults
                        </div>
                        <div className='d-flex justify-content-center align-items-center column-gap-3'>
                          <div className='d-flex justify-content-center align-items-center rounded-circle counterChange disabeled' style={{fontSize:"20px",height:"30px",width:"30px"}}>-</div><div>2</div><div className='d-flex justify-content-center align-items-center rounded-circle border border-1 border-black counterChange' style={{fontSize:"20px",height:"30px",width:"30px"}}>+</div>
                        </div>
                      </div>
                    </div></>
  )
}

export default ModalFields