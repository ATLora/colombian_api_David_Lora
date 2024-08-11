import React, { useEffect, useState } from "react";
import axios from "axios";
import DropdownCheckbox from "./DropdownCheckbox";
import "../Styles/Presidents.css";
import { capitalizeWords } from "../Helpers/HelperFunctions.js";

const Presidents = () => {
  const [presidents, setPresidents] = useState([]);
  const [groupedPresidents, setGroupedPresidents] = useState({});
  const [selectedParties, setSelectedParties] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityName = async (cityId) => {
      try {
        const response = await axios.get(
          `https://api-colombia.com/api/v1/City/${cityId}`
        );
        return response.data.name;
      } catch (error) {
        console.error("Error al obtener el nombre de la ciudad:", error);
        return null;
      }
    };

    const fetchPresidents = async () => {
      try {
        const response = await axios.get(
          "https://api-colombia.com/api/v1/President"
        );
        const presidentsData = await Promise.all(
          response.data.map(async (president) => {
            if (!president.city && president.cityId) {
              const cityName = await fetchCityName(president.cityId);
              president.city = { name: cityName };
            }
            // Normaliza el nombre del partido político
            president.politicalParty = capitalizeWords(
              president.politicalParty
            );
            return president;
          })
        );

        const grouped = presidentsData.reduce((acc, president) => {
          const party = president.politicalParty;
          if (!acc[party]) {
            acc[party] = [];
          }
          acc[party].push(president);
          return acc;
        }, {});

        setGroupedPresidents(grouped);
        setPresidents(presidentsData);
        setSelectedParties(Object.keys(grouped));
      } catch (error) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchPresidents();
  }, []);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePartySelectionChange = (selectedOptions) => {
    setSelectedParties(selectedOptions);
  };

  const sortedAndFilteredParties = Object.entries(groupedPresidents)
    .filter(([party]) => selectedParties.includes(party))
    .sort((a, b) => {
      const comparison = a[1].length - b[1].length;
      return sortOrder === "asc" ? comparison : -comparison;
    });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="presidents-container">
      <h2>Presidentes de Colombia</h2>

      <div className="controls">
        <label>
          Ordenar por cantidad de presidentes:
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            style={{ marginLeft: "10px" }}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </label>

        <div style={{ marginTop: "10px" }}>
          <DropdownCheckbox
            options={Object.keys(groupedPresidents)}
            selectedOptions={selectedParties}
            onChange={handlePartySelectionChange}
          />
        </div>
      </div>

      {sortedAndFilteredParties.map((group, index) => (
        <div key={index} className="party-section">
          <h3>
            {group[0]} ({group[1].length})
          </h3>
          <div className="cards-container">
            {group[1].map((president) => (
              <div key={president.id} className="president-card">
                <div className="president-info">
                  <h4>
                    {president.name} {president.lastName}
                  </h4>
                  <p>
                    {president.city
                      ? president.city.name
                      : "Ciudad desconocida"}
                  </p>
                  <p>
                    Período: {president.startPeriodDate} -{" "}
                    {president.endPeriodDate}
                  </p>
                </div>
                <div className="president-image">
                  <img
                    src={president.image}
                    alt={`${president.name} ${president.lastName}`}
                    onError={(e) => {
                      e.target.src =
                        "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Presidents;
