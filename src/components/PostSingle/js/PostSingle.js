import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/PostSingle.css';
import ammo from '../../../common/libs/ammo';
import {deletePost, downvotePost, editPost, updateActiveCategory, upvotePost, updateActivePost, deleteComment } from '../../../store/actions';
import { getCachedItem } from '../../../persistent-store';
import PostHeader from '../../PostHeader';
import PostBody from '../../PostBody';
import PostFooter from '../../PostFooter';
import PostActions from '../../PostActions';
import CommentsList from '../../CommentsList';
import { dispatchLocationUpdate } from '../../../global-events';

class PostSingle extends React.Component {
  state = {
    isActive: false,
    isCommentsSliderActive: false
  };

  deletePost = postId => {
    PostActions.deletePost(postId, () => {
      this.props.deletePost(postId);
      this.props.updateActivePost({});
      PostActions.deletePostComments(postId, comments => {
        comments.map(comment => this.props.deleteComment(comment.id));
        dispatchLocationUpdate();
        ammo.select('.trigger.go-home').get().click();
      });
    });
  };

  upvotePost = postId => {
    PostActions.voteOnPost(postId, 'upVote', () => {
      this.props.upvotePost(postId);

      const cachedPost = getCachedItem('posts', 'id', postId);
      if ( cachedPost ) {
        this.setState({ post: cachedPost });
      }

      // update global state
      this.props.updateActivePost(Object.assign({}, this.props.activePost, {
        voteScore: this.props.activePost.voteScore + 1
      }));
    });
  };

  downvotePost = postId => {
    PostActions.voteOnPost(postId, 'downVote', () => {
      this.props.downvotePost(postId);

      const cachedPost = getCachedItem('posts', 'id', postId);
      if ( cachedPost ) {
        this.setState({ post: cachedPost });
      }

      // update global state
      this.props.updateActivePost(Object.assign({}, this.props.activePost, {
        voteScore: this.props.activePost.voteScore - 1
      }));

      this.props.editPost(this.props.activePost.id, { voteScore: this.props.activePost.voteScore - 1 })
    });
  };

  componentDidMount() {
    const urlParts = ammo.getUrlParts();
    const postId = urlParts[1];
    const cachedPost = getCachedItem('posts', 'id', postId);

    if ( ! cachedPost ) {
      dispatchLocationUpdate();
      ammo.select('.trigger.go-home').get().click();
    }

    this.setState({ isActive: true });
  }

  componentWillReceiveProps(newProps) {
    if ( ammo.isObj(newProps.post) ) {
      this.setState({ post: newProps.post });
    }
  }

  toggleComments = () => {
    this.setState({ isCommentsSliderActive: ! this.state.isCommentsSliderActive });
  };

  render() {
    const post = this.props.activePost || {};
    const isActive = this.state.isActive;

    return (
      <article
        className={`component post single-post ${isActive ? 'active' : ''}`}
        data-id={post.id}
      >

        <PostHeader
          post={post}
          isSinglePage={true}
        />

        <PostBody
          post={post}
          isSinglePage={true}
        />

        <PostFooter
          post={post}
          upvotePost={this.upvotePost}
          downvotePost={this.downvotePost}
          setEditablePost={postId => this.props.setEditablePost(postId)}
          deletePost={this.deletePost}
          toggleComments={this.toggleComments}
        />

        <CommentsList
          post={post}
          onReady={() => this.setState({ isCommentsSliderActive: true })}
          isActive={this.state.isCommentsSliderActive}
        />

        <Link to={`/`} className="trigger go-home hidden"/>
      </article>
    );
  }
}

PostSingle.propTypes = {
  activePost: PropTypes.object
};

const mapStateToProps = state => {
  return {
    activePost: state.activePost
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveCategory: category => dispatch(updateActiveCategory(category)),
    updateActivePost: post => dispatch(updateActivePost(post)),
    deletePost: postId => dispatch(deletePost(postId)),
    upvotePost: postId => dispatch(upvotePost(postId)),
    editPost: (postId, postOptions) => dispatch(editPost(postId, postOptions)),
    downvotePost: postId => dispatch(downvotePost(postId)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostSingle);
