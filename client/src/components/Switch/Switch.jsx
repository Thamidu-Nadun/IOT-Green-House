import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Switch.css';

function Switch (props) {
  const [status, setStatus] = useState (false); // Store the device status

  const cardData = {
    name: props.name || 'Example',
    description: props.description ||
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    image: props.image || 'fan.jpg',
    endpoint: props.endpoint || 'http://localhost:3000/switch/fan/',
    borderColor: props.borderColor || '#6A80B9',
  };

  useEffect (() => {
    var status_url = cardData.endpoint + 'status';
    axios
      .get (status_url)
      .then (response => {
        setStatus (response.data.status);
      })
      .catch (error => {
        console.error ('Error fetching status:', error);
      });
  }, []);

  // Function to handle ON button click
  const handleTurnOn = () => {
    axios
      .post (`${cardData.endpoint}on`)
      .then (response => {
        setStatus (response.data.status); // Update the status
      })
      .catch (error => {
        console.error ('Error turning on:', error);
      });
  };

  // Function to handle OFF button click
  const handleTurnOff = () => {
    axios
      .post (`${cardData.endpoint}off`)
      .then (response => {
        setStatus (response.data.status); // Update the status
      })
      .catch (error => {
        console.error ('Error turning off:', error);
      });
  };

  return (
    <div className="card col-3 mx-3 my-3" style={{border: `1px solid ${cardData.borderColor}`}}>
      <img className="card-img-top rounded-2 my-2" src={cardData.image} alt="Fan" />
      <div className="card body">
        <div className="card title">{cardData.name}</div>
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
