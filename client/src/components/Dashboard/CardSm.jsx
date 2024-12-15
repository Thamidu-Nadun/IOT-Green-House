import React from 'react';

function CardSm (props) {
  const styles = {
    "1": `card border-left-${props.color} shadow h-100 py-2`,
    "2": `text-xs font-weight-bold text-${props.color} text-uppercase mb-1`,
    "3": `fas fa-${props.icon} fa-2x text-gray-300`
  }
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={styles[1]}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={styles[2]}>
                {props.title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {props.data}
              </div>
            </div>
            <div className="col-auto">
              <i className={styles[3]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSm;
