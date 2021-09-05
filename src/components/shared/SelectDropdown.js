import React, { useState } from "react"
import Select from 'react-select';
import './Select.css'

export const SelectDropdown = ({ options, placeholder, isMulti, setFilteredData, selectValue }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="filter">
      <Select
        defaultValue={selectValue}
        onChange={setFilteredData}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
      />
    </div>
  );
}