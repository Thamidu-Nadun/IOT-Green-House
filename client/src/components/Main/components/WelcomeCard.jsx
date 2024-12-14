import React from 'react';
import './welcome-card.css';

function WelcomeCard(props) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const hours = date.getHours();
  console.log(hours);
  const images = ['bg-img-1.jpeg'];
  const styles = {
    "background": `url(${images[0]})`,
  }
  return (
    <div className="welcome-card" style={styles}>
      <div className="card-title">
        <p className="title-welcome">
          Hi, <span className="fw-bold welcome-user">{props.name}</span>! Good {(hours<12)? 'Morning': (hours>12 && hours < 14)? Afternoon: 'Evening'}...
        </p>
        <p className="title-msg">Welcome Home, it’s snowing outside, stay safe</p>
      </div>
      <div className="card-status d-flex gap-2 me-4 mb-2">
        <span className="date">{formattedDate}</span>
      </div>
    </div>
  );
}

export default WelcomeCard;
