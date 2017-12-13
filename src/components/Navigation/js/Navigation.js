import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Navigation.css';
import ammo from '../../../common/libs/ammo';
import { enableAddPostModal, updateActiveCategory } from '../../../store/actions';
import { dispatchLocationUpdate, interceptLocationUpdate } from '../../../global-events';

class Navigation extends React.Component {

  highlightNavItem = () => {
    const nav = ammo.select('.main-navigation').get();
    const urlParts = ammo.getUrlParts();

    // normalize items
    ammo.selectAll('li', nav).each(item => item.classList.contains('selected') && item.classList.remove('selected'));

    // highlight selected item
    if ( urlParts.length === 0 ) {
      ammo.select('li:first-child', nav).get().classList.add('selected');
    } else if ( urlParts.length === 1 ) {
      ammo.select('li:nth-child(2)', nav).get().classList.add('selected');
      ammo.selectAll('.item-with-submenu li', nav).each(item => {
        if ( item.getAttribute('data-name') === urlParts[0] ) {
          item.classList.add('selected');
        }
      });
    }
  };

  componentDidMount() {
    this.highlightNavItem();

    interceptLocationUpdate(() => {
      setTimeout(() => this.highlightNavItem(), 50);
    });
  }

  render() {
    return (
      <div className="component navigation">
        <nav className="main-navigation">
          <ul>

            <li className="selected" onClick={() => {
              // dispatch global event
              dispatchLocationUpdate();
            }}>
              <Link to={'/'}>
                <span className="view-name">Home</span>
              </Link>
            </li>

            <li className="item-with-submenu">
              <div className="item-container">
                <span className="view-name" >Categories</span>

                <ul className="submenu">
                  {this.props.categories.map(category => (
                    <li key={category.name} data-name={category.name}>
                      <Link
                        to={`/${category.path}`}
                        replace={true}
                        onClick={() => {
                          this.props.updateActiveCategory(category.name);

                          // dispatch global event
                          dispatchLocationUpdate();
                        }}
                      >{ammo.titlize(category.name)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <button onClick={() => this.props.enableAddPostModal()}>Add post</button>
            </li>

          </ul>
        </nav>

      </div>
    );
  }
}

Navigation.propTypes = {
  categories: PropTypes.array
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveCategory: category => dispatch(updateActiveCategory(category)),
    enableAddPostModal: () => dispatch(enableAddPostModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
