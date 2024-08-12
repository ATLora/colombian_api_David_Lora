import React, { useState, useEffect } from "react";
import Presidents from "./components/Presidents";
import TouristicAttractions from "./components/TouristicAttractions";
import Tabs from "./components/Tabs";
import Contratenme from "./components/HireMe";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Presidentes", content: <Presidents /> },
    { label: "Areopuertos", content: <h1>Areopuertos</h1> },
    { label: "Atracciones Turísticas", content: <TouristicAttractions /> },
    { label: "Contrátame", content: <Contratenme /> },
  ];

  useEffect(() => {
    // Cambiar a la pestaña de Contrátame después de 2 minutos
    const timer = setTimeout(() => {
      setActiveTab(tabs.length - 1); // Última pestaña (Contrátame)
    }, 120000); // 2 minutos en milisegundos

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, [tabs.length]);

  return (
    <div className="App">
      <h1
        style={{
          borderBottom: "3px solid #4CAF50",
          paddingBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Colombia Dashboard</span>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#FFD700",
              marginLeft: "5px",
            }}
          ></div>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#0033A0",
              marginLeft: "5px",
            }}
          ></div>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#D52B1E",
              marginLeft: "5px",
            }}
          ></div>
        </div>
      </h1>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
