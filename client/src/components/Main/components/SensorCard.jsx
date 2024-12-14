import React from 'react';
import {CiTempHigh} from 'react-icons/ci';
import './SensorCard.css';
import Form from 'react-bootstrap/Form';

function SensorCard () {
  const styles = {
    background: '#D38312',
    background: 'linear-gradient(to right, #A83279, #D38312)',
    height: '20vh',
    borderRadius: '25px',
    boxShadow: '7px 7px 12px rgba(0, 0, 0, 0.45)',
  };
  return (
    <div className="sensor-card px-2 col-3 py-2" style={styles}>
      <div className="status col-12">
        <span className="sts">ON</span>
        <Form>
          <Form.Check type="switch" id="toggle-switch" />
        </Form>
      </div>
      <div className="mb-3 detail col-12 px-4 d-flex align-items-center">
        <div className="icon fs-3"><CiTempHigh /></div>
        <div className="detail-txt">Temperature</div>
      </div>
    </div>
  );
}

export default SensorCard;
