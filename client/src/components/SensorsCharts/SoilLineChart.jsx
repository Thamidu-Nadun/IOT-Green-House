import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SoilLineChart = (props) => {
  const [dataPoints, setDataPoints] = useState(Array(20).fill(0)); // Initialize with 20 zero values
  const [timeStamps, setTimeStamps] = useState(Array(20).fill('-')); // Initialize with 20 placeholder times

  const SoilChartData = {
    labels: props.name || 'Soil Moisture',
    borderColor: props.borderColor || 'rgba(75, 192, 192, 1)',
    backgroundColor: props.backgroundColor || 'rgba(75, 192, 192, 0.2)',
    endpoint: props.endpoint || 'http://192.168.4.1/soil',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch soil moisture data from the API endpoint
      axios.get(SoilChartData.endpoint)
        .then(response => {
          const { soil_moisture } = response.data;  // Extract the soil_moisture value

          // Get the current time in HH:MM:SS format
          const currentTime = new Date().toLocaleTimeString();

          // Update data points: add new data and remove the oldest if length exceeds 20
          setDataPoints((prevData) => {
            const newData = [...prevData, soil_moisture];
            if (newData.length > 20) newData.shift(); // Keep the last 20 data points
            return newData;
          });

          // Update timestamps: add new time and remove the oldest if length exceeds 20
          setTimeStamps((prevTime) => {
            const newTime = [...prevTime, currentTime];
            if (newTime.length > 20) newTime.shift(); // Keep the last 20 timestamps
            return newTime;
          });
        })
        .catch(error => {
          console.error('Error fetching soil data:', error);
        });
    }, 1000); // Fetch data every second

    return () => clearInterval(interval);
  }, []);

  // Chart data
  const chartData = {
    labels: timeStamps,
    datasets: [
      {
        label: SoilChartData.labels,
        data: dataPoints,
        borderColor: SoilChartData.borderColor,
        backgroundColor: SoilChartData.backgroundColor,
        borderWidth: 2,
        tension: 0.4, // Smooth the line curve for a smoother effect
        pointRadius: 3, // Size of the data points
        fill: false, // Don't fill under the line, keeping it clean
      },
    ],
  };

  // Chart options with Y-axis ranging from 0 to 100
  const options = {
    responsive: true,
    animation: {
      duration: 500, // Smooth animation for each update (500ms per update)
      easing: 'easeInOutQuad', // Smooth easing for the transition
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (HH:MM:SS)',
        },
        ticks: {
          autoSkip: true, // Automatically skip some labels to prevent clutter
          maxRotation: 0, // Prevent labels from rotating
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Soil Moisture (%)',
        },
        ticks: {
          callback: (value) => `${value} %`, // Display % for clarity
          min: 0, // Minimum Y value
          max: 100, // Maximum Y value
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: '80%', margin: 'auto', paddingTop: '20px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SoilLineChart;
