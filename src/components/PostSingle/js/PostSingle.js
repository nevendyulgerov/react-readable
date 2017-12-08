import React from 'react';
import '../css/PostSingle.css';
import ammo from '../../../common/libs/ammo';
import api from '../../../common/api';
import { connect } from 'react-redux';
import { getCachedItem } from '../../../store';
import PostHeader from '../../PostHeader';
import PostBody from '../../PostBody';
import PostFooter from '../../PostFooter';
import PostActions from "../../PostActions";
import {deletePost, downvotePost, updateActiveCategory, upvotePost} from "../../../store/actions";
import { Link } from 'react-router-dom';
import CommentsList from '../../CommentsList';

class PostSingle extends React.Component {
  state = {
    post: {},
    isActive: false,
    isCommentsSliderActive: false
  };

  deletePost = postId => {
    PostActions.deletePost(postId, () => {
      this.props.deletePost(postId);
      ammo.select('.trigger.go-home').get().click();
    });
  };

  upvotePost = postId => {
    PostActions.voteOnPost(postId, 'upVote', () => {
      this.props.upvotePost(postId);

      const cachedPost = getCachedItem('posts', 'id', postId);
      if ( cachedPost ) {
        this.setState({ post: cachedPost });
      }
    });
  };

  downvotePost = postId => {
    PostActions.voteOnPost(postId, 'downVote', () => {
      this.props.downvotePost(postId);

      const cachedPost = getCachedItem('posts', 'id', postId);
      if ( cachedPost ) {
        this.setState({ post: cachedPost });
      }
    });
  };

  addComment = postId => {
    console.log(postId);
  };

  syncPostData = () => {
    this.setState({
      post: this.props.activePost,
      isActive: true
    });
  };

  componentDidMount() {
    this.syncPostData();
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
    const post = this.state.post || {};
    const isActive = this.state.isActive;

    return (
      <article className={`component post single-post ${isActive ? 'active' : ''}`} data-id={post.id}>

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
          addComment={this.addComment}
          upvotePost={this.upvotePost}
          downvotePost={this.downvotePost}
          setEditablePost={postId => this.props.setEditablePost(postId)}
          deletePost={this.deletePost}
          toggleComments={this.toggleComments}
        />

        <CommentsList
          post={post}
          isActive={this.state.isCommentsSliderActive}
        />

        <Link to={'/'} className="trigger go-home hidden"/>
      </article>
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
    updateActiveCategory: category => dispatch(updateActiveCategory(category)),
    deletePost: postId => dispatch(deletePost(postId)),
    upvotePost: postId => dispatch(upvotePost(postId)),
    downvotePost: postId => dispatch(downvotePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostSingle);
