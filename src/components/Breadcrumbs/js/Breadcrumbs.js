import React from 'react';
import ammo from '../../../common/libs/ammo';
import '../css/Breadcrumbs.css';
import { Link } from 'react-router-dom';
import { getCachedItem } from '../../../persistent-store';
import { connect } from 'react-redux';
import {LOCATION_UPDATE, interceptEvent, dispatchEvent} from '../../../global-events';

class Breadcrumbs extends React.Component {
  state = {
    breadcrumbs: []
  };

  getBreadcrumbs = () => {
    const parts = ammo.getUrlParts();
    const root = { name: 'Home', path: '/' };
    let breadcrumbs = [root];

    if ( parts.length > 0 ) {
      parts.map((part, index) => {
        let prefix = '';

        if ( this.props.enableIdToTitleConversion ) {
          let prevParts = [];
          let prevIndex = index - 1;

          if ( prevIndex >= 0 ) {
            while ( prevIndex >= 0 ) {
              prevParts.push(`/${parts[prevIndex]}`);
              prevIndex--;
            }
          }

          prefix = prevParts.length > 0 ? prevParts.join('') : '';
          if ( prefix !== '' ) {
            const cachedPost = getCachedItem('posts', 'id', part);

            if ( cachedPost ) {
              breadcrumbs.push({
                name: cachedPost.title,
                path: `${prefix+'/'+part}`
              });
              return cachedPost.title;
            }
          }
        }

        breadcrumbs.push({
          name: ammo.titlize(part),
          path: `${prefix+'/'+part}`
        });
        return part;
      });
    }

    let sanitizedBreadcrumbs = [];
    breadcrumbs.map(breadcrumb => {
      const duplicates = sanitizedBreadcrumbs.filter(b => b.name === breadcrumb.name);
      if ( duplicates.length === 0 ) {
        sanitizedBreadcrumbs.push(breadcrumb);
      }
      return breadcrumb;
    });

    return sanitizedBreadcrumbs;
  };

  componentDidMount() {
    const breadcrumbs = this.getBreadcrumbs();
    this.setState({ breadcrumbs });

    interceptEvent(LOCATION_UPDATE, () => {
      setTimeout(() => this.setState({ breadcrumbs: this.getBreadcrumbs() }), 50);
    });
  }

  render() {
    const breadcrumbs = this.state.breadcrumbs;

    return (
      <div className="component breadcrumbs" title={'Breadcrumbs'}>
        <div className="breadcrumbs-container">
          <span className="breadcrumbs-label">You are here:</span>

          {breadcrumbs.map((breadcrumb, index) => (
            <div className="breadcrumb-item" key={index}>

              <Link
                to={`${breadcrumb.name.toLowerCase() !== 'home' ? `${breadcrumb.path}` : '/'}`}
                replace={true}
                className={'breadcrumb'}
                onClick={() => {
                  // dispatch global event
                  dispatchEvent(LOCATION_UPDATE);
                }}
              >{breadcrumb.name}</Link>

              {index + 1 < this.state.breadcrumbs.length && (
                <span className="breadcrumb-separator">/</span>
              )}

            </div>
          ))}

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    activePost: state.activePost
  };
};

export default connect(mapStateToProps)(Breadcrumbs);
