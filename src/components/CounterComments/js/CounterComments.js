import React from 'react';
import PropTypes from 'prop-types';
import '../css/CounterComments.css';
import FaComment from 'react-icons/lib/fa/comment';

const CounterComments = props => {
  const count = props.count;
  const isPositive = count >= 0;

  return (
    <div className={`component counter-comments ${isPositive ? 'positive' : ''}`}>
      <span className="count" title={'Comments count'}>{count}</span>
      <span className="icon"><FaComment/></span>
    </div>
  );
};

CounterComments.propTypes = {
  count: PropTypes.number
};

export default CounterComments;
