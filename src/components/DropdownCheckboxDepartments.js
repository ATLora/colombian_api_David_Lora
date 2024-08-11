import React, { useState } from "react";

const DropdownCheckboxDepartments = ({ departments, onSelectionChange }) => {
  const departmentKeys = Object.keys(departments); // Obtener las claves del objeto departments

  const [selectedDepartments, setSelectedDepartments] = useState(
    departmentKeys.reduce((acc, dept) => {
      acc[dept] = true; // Seleccionar todos los departamentos por defecto
      return acc;
    }, {})
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar la visibilidad del dropdown

  const handleCheckboxChange = (department) => {
    const newSelection = {
      ...selectedDepartments,
      [department]: !selectedDepartments[department],
    };
    setSelectedDepartments(newSelection);
    onSelectionChange(newSelection);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownContainerStyle = {
    position: "relative",
    display: "inline-block",
    marginBottom: "20px",
  };

  const dropdownStyle = {
    display: isDropdownOpen ? "block" : "none", // Controlar la visibilidad con el estado
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
      <button style={buttonStyle} onClick={toggleDropdown}>
        Select Departments
      </button>
      <div style={dropdownStyle}>
        {departmentKeys.map((department) => (
          <div key={department} style={checkboxContainerStyle}>
            <input
              type="checkbox"
              checked={selectedDepartments[department]}
              onChange={() => handleCheckboxChange(department)}
            />
            <label
              style={labelStyle}
            >{`${department} (${departments[department].total})`}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownCheckboxDepartments;
