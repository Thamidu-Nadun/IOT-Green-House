import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularChart(props) {
  const [percentage, setPercentage] = useState(0);
  const CircularChartData = {
    endpoint: props.endpoint || 'http://localhost:8080/temperature',
    unit: props.unit || '°C',
  }

  useEffect(() => {
    // Function to fetch the temperature
    const fetchTemperature = async () => {
      try {
        const response = await axios.get(CircularChartData.endpoint);
        const temp = response.data.temperature;
        setPercentage(temp);
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    // Fetch temperature every second
    const interval = setInterval(fetchTemperature, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}${CircularChartData.unit}`}
      styles={{
        path: {
          stroke: percentage > 30 ? '#f44336' : '#4caf50',
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

export default CircularChart;
