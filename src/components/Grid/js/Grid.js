import React from 'react';
import '../css/Grid.css';
import PostPanel from '../../PostPanel';
import Masonry from 'react-masonry-component';
import Sort from '../../Sort';
import sortBy from 'sort-by';
import Notification from '../../Notification';
import { connect } from 'react-redux';
import { updateSorting } from '../../../store/actions';
import {getCachedItem} from '../../../persistent-store';
import ammo from '../../../common/libs/ammo';
import api from '../../../common/api';
import { Link } from 'react-router-dom'

const masonryOptions = { transitionDuration: 0 };

class Grid extends React.Component {
  state = {
    isActive: false
  };

  componentDidMount() {
    const urlParts = ammo.getUrlParts();
    const categoryName = urlParts[0];

    if ( ! categoryName ) {
      return this.setState({ isActive: true });
    }

    const cachedCategory = getCachedItem('categories', 'name', categoryName);
    if ( ! cachedCategory ) {
      return api.getCategories((err, categories) => {
        if ( err || ! ammo.isArr(categories) || categories.filter(category => category.name === categoryName).length === 0 ) {
          return ammo.select('.trigger.go-home').get().click();
        }
        this.setState({ isActive: true });
      });
    }
    this.setState({ isActive: true });
  }

  render() {
    const category = this.props.category;
    let posts = category ? this.props.posts.filter(item => item.category === category) : this.props.posts;
    const sorting = this.props.sorting;

    if ( sorting.date !== '' ) {
      posts = posts.sort(sortBy(`${sorting.date === 'asc' ? '' : '-'}timestamp`));
    } else if ( sorting.score !== '' ) {
      posts = posts.sort(sortBy(`${sorting.score === 'asc' ? '' : '-'}voteScore`));
    } else {
      posts = posts.sort(sortBy('title'));
    }

    return (
      <div className={`component grid ${this.state.isActive ? 'active' : ''}`}>
        <Sort/>

        <Masonry
          className={'masonry-grid'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {posts.length > 0 ? posts.map(post => (
            <div className="grid-item" key={post.id}>
              <PostPanel post={post}/>
            </div>
          )) : category && (
            <Notification
              type={'info'}
              text={'No results found. Please try a different category.'}
              buttonUrl={'/'}
              buttonText={'Go to homepage'}
            />
          )}
        </Masonry>

        <Link to={'/'} className="trigger go-home hidden"/>
      </div>
    );
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

export default connect(mapPropsToState, mapDispatchToState)(Grid);
