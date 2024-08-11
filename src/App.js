import "./App.css";
import Presidents from "./components/Presidents";
import TouristicAttractions from "./components/TouristicAttractions";
import Tabs from "./components/Tabs";

function App() {
  const tabs = [
    {
      label: "Presidentes",
      content: <Presidents />,
    },
    {
      label: "Areopuertos",
      content: <h1>Areopuertos</h1>,
    },
    {
      label: "Atracciones Turísticas",
      content: <TouristicAttractions />,
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Colombia Dashboard</h1>
        <div className="flag-colors">
          <div className="color-box yellow"></div>
          <div className="color-box blue"></div>
          <div className="color-box red"></div>
        </div>
      </header>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default App;
