import React from 'react';
import '../css/PostHeader.css';
import ammo from '../../../common/libs/ammo';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateActivePost } from '../../../store/actions';

class PostHeader extends React.Component {
  selectPost = () => {

    // update global state
    this.props.updateActivePost(this.props.post);
  };

  render() {
    const post = this.props.post;
    const isSinglePage = this.props.isSinglePage;

    return (
      <div className="component post-header">

        {isSinglePage ? (
          <header className="panel-header" style={{background: ammo.randomGradient(122)}}>
            <div className="post-meta">
              <span className="author" title={'Author'}>{post.author}</span>
              <time title="Created date">{ammo.formatTime(post.timestamp)}</time>
            </div>
            <h2 className="post-title">{post.title}</h2>
          </header>
        ) : (
          <Link
            to={`/${post.category}/${post.id}`}
            className="trigger view-post-details"
            title={'View post details'}
            onClick={e => this.selectPost(e)}
          >
            <header className="panel-header" style={{background: ammo.randomGradient(122)}}>
              <div className="post-meta">
                <span className="author" title={'Author'}>{post.author}</span>
                <time title="Created date">{ammo.formatTime(parseInt(post.timestamp, 10))}</time>
              </div>
              <h2 className="post-title">{post.title}</h2>
            </header>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activePost: state.activePost
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateActivePost: post => dispatch(updateActivePost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostHeader);
