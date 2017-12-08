import React from 'react';
import ammo from '../../../common/libs/ammo';
import {Link} from 'react-router-dom';
import '../css/Navigation.css';
import { connect } from 'react-redux';
import { updateActiveCategory } from '../../../store/actions';

class Navigation extends React.Component {

  getUrlParts = () => window.location.pathname.split('/').filter(item => ammo.isStr(item) && item !== '');

  highlightNavItem = () => {
    const nav = ammo.select('.main-navigation').get();
    const urlParts = this.getUrlParts();

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
    ammo.poll(resolve => {
      this.highlightNavItem();
      resolve(true);
    }, () => {}, this.props.pollInterval);
  }

  render() {
    return (
      <div className="component navigation">
        <nav className="main-navigation">
          <ul>

            <li className="selected">
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
                        to={`${category.path}`}
                        onClick={() => this.props.updateActiveCategory(category.name)}
                      >{ammo.titlize(category.name)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <button onClick={() => this.props.activateAddPostModal()}>Add post</button>
            </li>

          </ul>
        </nav>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeCategory: state.activeCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveCategory: category => dispatch(updateActiveCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
