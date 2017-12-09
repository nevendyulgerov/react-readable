import React from 'react';
import '../css/Sort.css';
import { connect } from 'react-redux';
import ammo from '../../../common/libs/ammo';
import {updateSorting} from "../../../store/actions";

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

class Sort extends React.Component {

  setSorting = (type, direction) => {
    this.props.updateSorting(type, direction);
    this.disableSorting(type === 'date' ? 'score' : 'date');
  };

  disableSorting = type => this.props.updateSorting(type, '');

  applySorting = event => {
    const sortingType = event.target.closest('.sort-by').getAttribute('data-sort-type');
    const direction = event.target.value;
    const isActive = direction !== '';

    if ( ! isActive ) {
      this.disableSorting(sortingType);
    }
    this.setSorting(sortingType, direction);

    ammo.selectAll(`.sort-by.${sortingType === 'date' ? 'score' : 'date'} option`).each((option, index) => {
      if ( index === 0 ) {
        option.selected = true;
      }
    });
  };

  render() {
    const sorting = this.props.sorting || {};

    return (
      <div className="component sort">

        <div className="sort-by date" data-sort-type="date">
          <span className="label">Sort by date:</span>

          <select onChange={e => this.applySorting(e)} defaultValue={sorting.date}>
            {sortingItems.map(item => (
              <option value={item.value} key={item.value}>{ammo.titlize(item.label)}</option>
            ))}
          </select>
        </div>

        <div className="sort-by score" data-sort-type="score">
          <span className="label">Sort by vote score:</span>

          <select onChange={e => this.applySorting(e)} defaultValue={sorting.score}>
            {sortingItems.map(item => (
              <option value={item.value} key={item.value}>{ammo.titlize(item.label)}</option>
            ))}
          </select>
        </div>

      </div>
    )
  }
}

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
