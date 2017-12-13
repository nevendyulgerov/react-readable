import React from 'react';
import PropTypes from 'prop-types';
import '../css/PostBody.css';

const PostBody = props => {
  const content = props.isSinglePage ? props.post.body : `${props.post.body ? props.post.body.substr(0, 100)+'...' : ''}`;

  return (
    <div className="component post-body">
      <p className={`${! props.isSinglePage ? 'post-excerpt' : ''}`}>{content}</p>
    </div>
  );
};

PostBody.propTypes = {
  post: PropTypes.object,
  isSinglePage: PropTypes.bool
};

export default PostBody;
