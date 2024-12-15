import React from 'react';
import morningImage from '../../assets/img/morning.jpeg';
import afternoonImage from '../../assets/img/afternoon.jpeg';
import eveningImage from '../../assets/img/evening.jpeg';
import nightImage from '../../assets/img/night.jpeg';

function CardMd(props) {
  const date = new Date();

  const hour = date.getHours();
  const timeImage =
    hour >= 5 && hour < 12
      ? morningImage
      : hour >= 12 && hour < 17
      ? afternoonImage
      : hour >= 17 && hour < 20
      ? eveningImage
      : nightImage;

  const timeMessage =
    hour >= 5 && hour < 12
      ? 'Morning'
      : hour >= 12 && hour < 17
      ? 'Afternoon'
      : hour >= 17 && hour < 20
      ? 'Evening'
      : 'Night';

  const styles = {
    background: `url(${timeImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '200px',
    width: '100%',
    borderRadius: '25px'
  };

  return (
    <div className="col-xl-6 col-md-12 mb-4">
      <div className="card border-left-success shadow h-100 py-2" style={styles}>
        <div className="card-body row">
          <div className="col">
            Hi, {props.name} ! Good {timeMessage}...
          </div>
          <div className="col d-flex justify-content-end align-items-end">
            {
              date.getFullYear() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getDate()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMd;
