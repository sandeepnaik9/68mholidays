"use client"
import React, { useState } from 'react';

const AddRegionDropDown = ({ options, onSelect, setModal, setModalF, helperText, placeholder,type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option); // Optional: Trigger a callback function when an option is selected
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown w-100 position-absolute inputField" style={{backgroundColor:"white"}} >
      <div className="dropdown-header d-flex justify-content-between align-items-center" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : placeholder}
        <i className={`fa-solid ${isOpen ? 'fa-angle-up' : 'fa-angle-down '}`}></i>
      </div>
      {isOpen && (
        <ul className="options-list w-100">
          <li style={{cursor:"pointer"}} onClick={()=>{setModal(true);setModalF(type)}}>{helperText}</li>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddRegionDropDown;
