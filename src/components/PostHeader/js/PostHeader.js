import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/PostHeader.css';
import ammo from '../../../common/libs/ammo';
import { updateActivePost } from '../../../store/actions';
import { dispatchLocationUpdate } from '../../../global-events';

const PostHeader = props => {
  const post = props.post;
  const isSinglePage = props.isSinglePage;

  const selectPost = () => {
    props.updateActivePost(props.post);
    dispatchLocationUpdate();
  };

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
          onClick={e => selectPost(e)}
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
};

PostHeader.propTypes = {
  post: PropTypes.object,
  isSinglePage: PropTypes.bool
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateActivePost: post => dispatch(updateActivePost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostHeader);
