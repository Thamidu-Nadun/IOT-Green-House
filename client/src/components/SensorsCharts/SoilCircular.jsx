import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function SoilCircular(props) {
  const [percentage, setPercentage] = useState(0); // State to hold the soil moisture value
  const [unit, setUnit] = useState('%'); // State to hold the unit

  const SoilCircularData = {
    endpoint: props.endpoint || 'http://192.168.4.1/soil', // Soil moisture endpoint
  };

  useEffect(() => {
    // Function to fetch the soil moisture data
    const fetchSoil = async () => {
      try {
        const response = await axios.get(SoilCircularData.endpoint);
        const { soil_moisture, unit } = response.data; // Extract soil moisture and unit from API response

        // Set unit to "%" if it's "percentage"
        if (unit === 'percentage') {
          setUnit('%');
        }

        setPercentage(soil_moisture); // Set the soil moisture value
      } catch (error) {
        console.error('Error fetching soil data:', error);
      }
    };

    // Fetch soil moisture every second
    const interval = setInterval(fetchSoil, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}${unit}`} // Display value and unit
      styles={{
        path: {
          stroke: percentage > 70 ? '#f44336' : '#4caf50', // Change color based on threshold
          strokeWidth: 8,
        },
        trail: {
          stroke: '#d6d6d6',
          strokeWidth: 8,
        },
        text: {
          fill: '#333',
          fontSize: '16px',
        },
      }}
    />
  );
}

export default SoilCircular;
