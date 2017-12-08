import React from 'react';
import '../css/Grid.css';
import PostPanel from '../../PostPanel';
import Masonry from 'react-masonry-component';
import Sort from '../../Sort';
import sortBy from 'sort-by';
import Notification from '../../Notification';
const masonryOptions = { transitionDuration: 0 };

class Grid extends React.Component {
  state = {
    sortByDate: {
      isActive: false,
      direction: 'desc'
    },
    sortByVoteScore: {
      isActive: false,
      direction: 'desc'
    }
  };

  setSorting = (type, direction) => {
    this.setState({
      [type]: {
        isActive: true,
        direction
      }
    });
  };

  disableSorting = type => {
    this.setState({
      [type]: {
        isActive: false,
        direction: 'desc'
      }
    })
  };

  render() {
    const category = this.props.category;
    let posts = category ? this.props.posts.filter(item => item.category === category) : this.props.posts;
    const sortByDate = this.state.sortByDate;
    const sortByVoteScore = this.state.sortByVoteScore;

    if ( sortByDate.isActive ) {
      posts = posts.sort(sortBy(`${sortByDate.direction === 'asc' ? '' : '-'}timestamp`));
    } else if ( sortByVoteScore.isActive ) {
      posts = posts.sort(sortBy(`${sortByVoteScore.direction === 'asc' ? '' : '-'}voteScore`));
    }

    return (
      <div className="component grid">
        <Sort
          setSorting={this.setSorting}
          disableSorting={this.disableSorting}
        />

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
              text={'No results found. Please try a different category'}
              buttonUrl={'/'}
              buttonText={'Go to homepage'}
            />
          )}
        </Masonry>
      </div>
    );
  }
}

export default Grid;
