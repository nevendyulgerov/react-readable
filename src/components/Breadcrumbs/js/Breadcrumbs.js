import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Breadcrumbs.css';
import ammo from '../../../common/libs/ammo';
import { getCachedItem } from '../../../persistent-store';
import { interceptLocationUpdate, dispatchLocationUpdate } from '../../../global-events';
import { updateActiveCategory } from '../../../store/actions';

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

    interceptLocationUpdate(() => {
      setTimeout(() => this.setState({ breadcrumbs: this.getBreadcrumbs() }), 50);
    });
  }

  render() {
    const breadcrumbs = this.state.breadcrumbs;
    const categories = this.props.categories;

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
                  dispatchLocationUpdate();

                  const matchingCategories = categories.filter(category => category.name === breadcrumb.name.toLowerCase());
                  if ( matchingCategories[0] ) {
                    this.props.updateActiveCategory(matchingCategories[0].name);
                  }
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
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveCategory: category => dispatch(updateActiveCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);
