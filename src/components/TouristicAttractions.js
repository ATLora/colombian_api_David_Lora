import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownCheckboxDepartments from "./DropdownCheckboxDepartments";
import "../Styles/TouristicAttractions.css";

const TouristicAttractions = () => {
  const [attractions, setAttractions] = useState({});
  const [selectedDepartments, setSelectedDepartments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(
          "https://api-colombia.com/api/v1/TouristicAttraction"
        );

        const groupedAttractions = await groupAttractionsByDepartmentAndCity(
          response.data
        );

        setAttractions(groupedAttractions);
        setSelectedDepartments(
          Object.keys(groupedAttractions).reduce((acc, dept) => {
            acc[dept] = true;
            return acc;
          }, {})
        );
      } catch (error) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  const groupAttractionsByDepartmentAndCity = async (attractions) => {
    const departmentMap = {};
    for (const attraction of attractions) {
      const departmentId = attraction.city?.departmentId;
      if (!departmentId) continue;

      const departmentResponse = await axios.get(
        `https://api-colombia.com/api/v1/department/${departmentId}`
      );
      const departmentName = departmentResponse.data.name;
      const cityName = attraction.city?.name;

      if (!departmentMap[departmentName]) {
        departmentMap[departmentName] = { cities: {}, total: 0 };
      }

      if (!departmentMap[departmentName].cities[cityName]) {
        departmentMap[departmentName].cities[cityName] = [];
      }

      departmentMap[departmentName].cities[cityName].push(attraction);
      departmentMap[departmentName].total++;
    }
    return departmentMap;
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedDepartments(newSelection);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const filteredDepartments = Object.keys(attractions).filter(
    (dept) => selectedDepartments[dept]
  );

  return (
    <div>
      <h2>Atracciones Turísticas</h2>
      <DropdownCheckboxDepartments
        departments={attractions}
        onSelectionChange={handleSelectionChange}
      />
      <div className="attractions-list">
        {filteredDepartments.length === 0 ? (
          <p>No se encontraron atracciones.</p>
        ) : (
          filteredDepartments.map((department) => (
            <div key={department}>
              <h3>{`${department} (${attractions[department].total})`}</h3>
              {Object.keys(attractions[department].cities).map((city) => (
                <div key={city}>
                  <h4>{`${city} (${attractions[department].cities[city].length})`}</h4>
                  {attractions[department].cities[city].map((attraction) => (
                    <div key={attraction.id} className="attraction-card">
                      <h3>{attraction.name}</h3>
                      <p>{attraction.description}</p>
                      <img
                        src={
                          attraction.images && attraction.images.length > 0
                            ? attraction.images[0]
                            : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                        }
                        alt={attraction.name}
                        onError={(e) => {
                          e.target.src =
                            "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TouristicAttractions;
