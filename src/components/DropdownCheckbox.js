import React, { useState } from "react";

const DropdownCheckbox = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange([...selectedOptions, value]);
    } else {
      onChange(selectedOptions.filter((option) => option !== value));
    }
  };

  const dropdownContainerStyle = {
    position: "relative",
    display: "inline-block",
    marginBottom: "20px",
  };

  const dropdownStyle = {
    display: isOpen ? "block" : "none", // Controlar la visibilidad con el estado
    position: "absolute",
    backgroundColor: "#f1f1f1",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    zIndex: 1,
    marginTop: "10px",
    padding: "10px",
    borderRadius: "4px",
  };

  const checkboxContainerStyle = {
    padding: "8px 0",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 16px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "4px",
  };

  const labelStyle = {
    marginLeft: "8px",
    fontSize: "14px",
  };

  return (
    <div style={dropdownContainerStyle}>
      <button style={buttonStyle} onClick={handleToggleDropdown}>
        Seleccionar partidos
      </button>
      <div style={dropdownStyle}>
        {options.map((option, index) => (
          <div key={index} style={checkboxContainerStyle}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleOptionChange}
            />
            <label style={labelStyle}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownCheckbox;
