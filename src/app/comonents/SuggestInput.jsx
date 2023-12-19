import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/stores'

 // Import your CSS file

const CustomInput = ({ suggestions,defaultValue,setSelected,setPlaces,type,inputValue,setInputValue, setAddC, placeholder }) => {
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions,setFilteredSuggestions] = useState([])
  const change = useAppSelector((state) => state.package.change)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
        const filter = suggestions.filter((item)=>item["name"].toLowerCase().includes(value.toLowerCase()))
        if(filter.length>0){
            setShowSuggestions(true)
            setFilteredSuggestions(filter)
        }
      
        else{
            
            setShowSuggestions(false)
        }
        
      
    } else {
      setShowSuggestions(false);
    }
    // You can add additional logic for suggestions filtering here if needed
  };

  const handleSuggestionClick =async (value) => {
    setInputValue(value);
    setSelected(value)
    const places = await (await fetch(`/api/package/getDestination?country=${value}`,{method:"GET"})).json()
    console.log(places.data)
    if(type=="country"){
    setPlaces(places.data)

}

    
    setShowSuggestions(false);
    // Perform actions based on selected suggestion if needed
  };
  
  useEffect(()=>{
    setFilteredSuggestions(suggestions)
    

  },[suggestions,change])

  return (
    <div className="custom-input d-flex flex-column justify-content-center position-relative">
      <input
        type="text"
        className='aEdit'
        defaultValue={defaultValue}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {showSuggestions && (
        <ul className="suggestion-list position-absolute border rounded-3 bg-white" style={{maxHeight:"200px",overflow:"scroll",top:"45px",listStyle:"none",margin:0,padding:0,zIndex:4}}>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} className='border p-2' onClick={() => handleSuggestionClick(suggestion.name)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomInput;
