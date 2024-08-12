import React from "react";

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div style={{ display: "flex", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #ddd",
          padding: "10px",
          width: "200px",
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            style={{
              padding: "10px",
              textAlign: "left",
              border: "none",
              backgroundColor: activeTab === index ? "#eee" : "transparent",
              cursor: "pointer",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
