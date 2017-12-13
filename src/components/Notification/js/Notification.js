import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Notification.css'
import ammo from '../../../common/libs/ammo';
import { dispatchLocationUpdate } from '../../../global-events';

const Notification = props => (
  <div className={`component notification ${props.type || 'info'}`} style={{background: ammo.randomGradient(140)}}>
    <span className="notification-text">{props.text}</span>

    {props.buttonUrl && props.buttonText && (
      <Link to={props.buttonUrl} className="trigger" onClick={() => {

        // dispatch global event
        dispatchLocationUpdate();

      }}>{props.buttonText}</Link>
    )}
  </div>
);

Notification.propTypes = {
  text: PropTypes.string
};

export default Notification;
