import React from 'react';
import '../css/PostSingle.css';
import ammo from '../../../common/libs/ammo';
import { connect } from 'react-redux';
import PostHeader from '../../PostHeader';
import PostBody from '../../PostBody';
import PostFooter from '../../PostFooter';
import PostActions from "../../PostActions";
import {deletePost, downvotePost, updateActiveCategory, upvotePost, updateActivePost} from '../../../store/actions';
import { Link } from 'react-router-dom';
import CommentsList from '../../CommentsList';
import { getCachedItem } from '../../../persistent-store';
import api from '../../../common/api';

class PostSingle extends React.Component {
  state = {
    isActive: false,
    isCommentsSliderActive: false
  };

  deletePost = postId => {
    PostActions.deletePost(postId, () => {
      this.props.deletePost(postId);
      this.props.updateActivePost({});

      // TODO: Delete post comments from store

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

      // global state update
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

      // global state update
      this.props.updateActivePost(Object.assign({}, this.props.activePost, {
        voteScore: this.props.activePost.voteScore - 1
      }));
    });
  };

  componentDidMount() {
    const urlParts = ammo.getUrlParts();
    const postId = urlParts[1];

    const cachedPost = getCachedItem('posts', 'id', postId);
    if ( ! cachedPost ) {
      return api.getPost(postId, (err, post) => {
        if ( err || ! ammo.isObj(post) ) {
          return ammo.select('.trigger.go-home').get().click();
        }
        this.setState({ isActive: true });
      })
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
    downvotePost: postId => dispatch(downvotePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostSingle);
