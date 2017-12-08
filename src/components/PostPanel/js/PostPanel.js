import React from 'react';
import '../css/PostPanel.css';
import {connect} from 'react-redux';
import PostHeader from '../../PostHeader';
import PostBody from '../../PostBody';
import PostFooter from '../../PostFooter';
import {deletePost, updateActiveCategory, upvotePost, downvotePost} from '../../../store/actions';
import PostActions from '../../PostActions';
import CommentsList from '../../CommentsList';

class PostPanel extends React.Component {
  state = {
    isCommentsSliderActive: false
  };

  deletePost = postId => {
    PostActions.deletePost(postId, () => this.props.deletePost(postId));
  };

  upvotePost = postId => {
    PostActions.voteOnPost(postId, 'upVote', () => this.props.upvotePost(postId));
  };

  downvotePost = postId => {
    PostActions.voteOnPost(postId, 'downVote', () => this.props.downvotePost(postId));
  };

  toggleComments = () => {
    this.setState({ isCommentsSliderActive: ! this.state.isCommentsSliderActive });
  };

  addComment = () => {
    console.log(this.props.post);
  };

  render() {
    const post = this.props.post || {};

    return (
      <article
        data-id={post.id}
        className={`component post post-panel ${this.props.isFullscreen ? 'fullscreen' : ''}`}
      >
        <PostHeader
          post={post}
          isSinglePage={false}
        />
        <PostBody
          post={post}
          isSinglePage={false}
        />
        <PostFooter
          post={post}
          upvotePost={this.upvotePost}
          downvotePost={this.downvotePost}
          deletePost={this.deletePost}
          setEditablePost={this.props.setEditablePost}
          setEditableComment={this.props.setEditableComment}
          toggleComments={this.toggleComments}
        />

        <CommentsList
          post={post}
          isActive={this.state.isCommentsSliderActive}
        />
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeCategory: state.activeCategory
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateActiveCategory: category => dispatch(updateActiveCategory(category)),
    deletePost: postId => dispatch(deletePost(postId)),
    upvotePost: postId => dispatch(upvotePost(postId)),
    downvotePost: postId => dispatch(downvotePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPanel);