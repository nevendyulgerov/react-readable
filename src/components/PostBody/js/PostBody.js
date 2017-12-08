import React from 'react';
import '../css/PostBody.css';

const PostBody = props => {
  const content = props.isSinglePage ? props.post.body : `${props.post.body ? props.post.body.substr(0, 100)+'...' : ''}`;

  return (
    <div className="component post-body">
      <p className={`${! props.isSinglePage ? 'post-excerpt' : ''}`}>{content}</p>
    </div>
  );
};

export default PostBody;
