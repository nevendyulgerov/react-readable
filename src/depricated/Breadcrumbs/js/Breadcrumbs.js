import React from 'react';
import ammo from '../../../common/libs/ammo';
import Common from '../../Common'
import '../css/Breadcrumbs.css';

class Breadcrumbs extends React.Component {
  state = {
    breadcrumbs: []
  };

  getBreadcrumbs = () => {
    const parts = Common.getUrlParts();
    const root = { name: 'Home', path: '/' };
    let breadcrumbs = [root];

    if ( parts.length > 0 ) {
      parts.map(part => {
        breadcrumbs.push({name: ammo.titlize(part), path: `${part}/`});
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
    ammo.poll(resolve => {
      const breadcrumbs = this.getBreadcrumbs();
      this.setState({ breadcrumbs });
      resolve(true);
    }, () => {}, this.props.pollInterval);
  }

  render() {
    return (
      <div className="component breadcrumbs" title={'Breadcrumbs'}>
        <div className="breadcrumbs-container">
          <span className="breadcrumbs-label">You are here:</span>

          {this.state.breadcrumbs.map((breadcrumb, index) => (
            <div className="breadcrumb-item" key={index}>
              <a
                href={breadcrumb.path}
                className="breadcrumb"
                onClick={event => {
                  event.preventDefault();
                  window.location.href = breadcrumb.name.toLowerCase() !== 'home' ? breadcrumb.name.toLowerCase() : '/';
                }}
              >
                {breadcrumb.name}</a>
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

export default Breadcrumbs;
