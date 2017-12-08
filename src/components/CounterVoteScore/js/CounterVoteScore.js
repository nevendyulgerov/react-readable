import React from 'react';
import '../css/CounterVoteScore.css';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';

const CounterVoteScore = props => {
  const score = props.score;
  const isPositiveScore = score >= 0;

  return (
    <div className={`component counter-vote-score ${isPositiveScore ? 'positive' : 'negative'}`} title="Vote score">
      <span className="score">{score}</span>
      <span className="icon"><FaThumbsUp/></span>
    </div>
  );
};

export default CounterVoteScore;
