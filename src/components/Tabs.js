import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const containerStyle = {
    display: "flex",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "20px",
  };

  const tabButtonsStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f1f1f1",
    minWidth: "150px",
  };

  const tabButtonStyle = (isActive) => ({
    padding: "15px",
    textAlign: "left",
    backgroundColor: isActive ? "#ffffff" : "#f1f1f1",
    borderLeft: isActive ? "4px solid #4CAF50" : "4px solid transparent",
    cursor: "pointer",
    fontWeight: isActive ? "bold" : "normal",
  });

  const tabContentStyle = {
    padding: "20px",
    backgroundColor: "#ffffff",
    flexGrow: 1,
  };

  return (
    <div style={containerStyle}>
      <div style={tabButtonsStyle}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={tabButtonStyle(activeTab === index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={tabContentStyle}>
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
