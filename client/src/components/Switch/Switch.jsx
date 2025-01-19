import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Switch.css';

function Switch(props) {
  const [status, setStatus] = useState(false); // Store the device status

  const cardData = {
    name: props.name || 'Fan',
    description: props.description ||
      'Control the fan (ON/OFF).',
    image: props.image || 'fan.jpg',
    endpoint: props.endpoint || 'http://192.168.4.1/switch/fan/', // Corrected endpoint for fan control
    borderColor: props.borderColor || '#6A80B9',
  };

  useEffect(() => {
    // Fetch device status from the endpoint
    const statusUrl = cardData.endpoint + 'status'; // Adjusted status endpoint
    axios
      .get(statusUrl)
      .then(response => {
        setStatus(response.data.status); // Update the status from the response
      })
      .catch(error => {
        console.error('Error fetching status:', error);
      });
  }, [cardData.endpoint]); // Rerun when the endpoint changes

  // Function to handle ON button click
  const handleTurnOn = () => {
    axios
      .get(`${cardData.endpoint}?action=on`) // ESP32 endpoint for turning the device on
      .then(response => {
        setStatus(response.data.status); // Update the status
      })
      .catch(error => {
        console.error('Error turning on:', error);
      });
  };

  // Function to handle OFF button click
  const handleTurnOff = () => {
    axios
      .get(`${cardData.endpoint}?action=off`) // ESP32 endpoint for turning the device off
      .then(response => {
        setStatus(response.data.status); // Update the status
      })
      .catch(error => {
        console.error('Error turning off:', error);
      });
  };

  return (
    <div className="card col-3 mx-3 my-3" style={{ border: `1px solid ${cardData.borderColor}` }}>
      <img className="card-img-top rounded-2 my-2" src={cardData.image} alt={cardData.name} />
      <div className="card-body">
        <div className="card-title">{cardData.name}</div>
        <div className="row">
          <div className="col-6 description">
            <p>{cardData.description}</p>
          </div>
          <div className="col-6 btn-container">
            <button
              className={`button btn-on ${status ? 'btn-hide' : 'btn-show'}`}
              onClick={handleTurnOn}
            >
              ON
            </button>
            <button
              className={`button btn-off ${status ? 'btn-show' : 'btn-hide'}`}
              onClick={handleTurnOff}
            >
              OFF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Switch;
