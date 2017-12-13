import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Sort.css';
import ammo from '../../../common/libs/ammo';
import { updateSorting } from '../../../store/actions';

const sortingItems = [{
  label: 'off',
  value: ''
}, {
  label: 'ascending',
  value: 'asc'
}, {
  label: 'descending',
  value: 'desc'
}];

const Sort = props => {
  const sorting = props.sorting || {};

  const setSorting = (type, direction) => {
    props.updateSorting(type, direction);
    disableSorting(type === 'date' ? 'score' : 'date');
  };

  const disableSorting = type => props.updateSorting(type, '');

  const applySorting = event => {
    const sortingType = event.target.closest('.sort-by').getAttribute('data-sort-type');
    const direction = event.target.value;
    const isActive = direction !== '';

    if ( ! isActive ) {
      disableSorting(sortingType);
    }
    setSorting(sortingType, direction);

    ammo.selectAll(`.sort-by.${sortingType === 'date' ? 'score' : 'date'} option`).each((option, index) => {
      if ( index === 0 ) {
        option.selected = true;
      }
    });
  };

  return (
    <div className="component sort">

      <div className="sort-by date" data-sort-type="date">
        <span className="label">Sort by date:</span>

        <select onChange={e => applySorting(e)} defaultValue={sorting.date}>
          {sortingItems.map(item => (
            <option value={item.value} key={item.value}>{ammo.titlize(item.label)}</option>
          ))}
        </select>
      </div>

      <div className="sort-by score" data-sort-type="score">
        <span className="label">Sort by vote score:</span>

        <select onChange={e => applySorting(e)} defaultValue={sorting.score}>
          {sortingItems.map(item => (
            <option value={item.value} key={item.value}>{ammo.titlize(item.label)}</option>
          ))}
        </select>
      </div>

    </div>
  );
};

Sort.propTypes = {
  sorting: PropTypes.object
};

const mapPropsToState = state => {
  return {
    sorting: state.sorting
  };
};

const mapDispatchToState = dispatch => {
  return {
    updateSorting: (sortType, sortValue) => dispatch(updateSorting(sortType, sortValue))
  };
};

export default connect(mapPropsToState, mapDispatchToState)(Sort);
