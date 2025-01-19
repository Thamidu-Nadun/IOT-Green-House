import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function HumidityCircular(props) {
  const [percentage, setPercentage] = useState(0); // State to hold the humidity value
  const [unit, setUnit] = useState('%'); // State to hold the unit

  const HumidityCircularData = {
    endpoint: props.endpoint || 'http://192.168.4.1/humidity', // Humidity endpoint
  };

  useEffect(() => {
    // Function to fetch the humidity
    const fetchHumidity = async () => {
      try {
        const response = await axios.get(HumidityCircularData.endpoint);
        let { humidity, unit } = response.data; // Correctly extract humidity and unit

        // If the unit is "percentage", replace it with "%"
        if (unit === 'percentage') {
          unit = '%';
        }

        setPercentage(humidity); // Update the percentage state
        setUnit(unit); // Update the unit state
      } catch (error) {
        console.error('Error fetching humidity:', error);
      }
    };

    // Fetch humidity every second
    const interval = setInterval(fetchHumidity, 1000);

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

export default HumidityCircular;
