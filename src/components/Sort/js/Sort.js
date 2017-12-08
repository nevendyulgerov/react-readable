import React from 'react';
import '../css/Sort.css';

class Sort extends React.Component {

  applySorting = event => {
    const sortingType = event.target.closest('.sort-by').getAttribute('data-sort-type');
    const direction = event.target.value;
    const isActive = direction !== '';

    if ( ! isActive ) {
      this.props.disableSorting(sortingType);
    }
    this.props.setSorting(sortingType, direction);
  };

  render() {
    return (
      <div className="component sort">

        <div className="sort-by date" data-sort-type="sortByDate">
          <span className="label">Sort by date:</span>
          <select onChange={e => this.applySorting(e)}>
            <option value={''}>Off</option>
            <option value={'asc'}>Ascending</option>
            <option value={'desc'}>Descending</option>
          </select>
        </div>

        <div className="sort-by vote-score" data-sort-type="sortByVoteScore">
          <span className="label">Sort by score:</span>
          <select onChange={e => this.applySorting(e)}>
            <option value={''}>Off</option>
            <option value={'asc'}>Ascending</option>
            <option value={'desc'}>Descending</option>
          </select>
        </div>

      </div>
    )
  }
}

export default Sort;
