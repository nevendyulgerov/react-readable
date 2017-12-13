import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Comment.css';
import ammo from '../../../common/libs/ammo';
import OptionsPanel from '../../OptionsPanel';
import CounterVoteScore from '../../CounterVoteScore';
import { upvoteComment, downvoteComment, editComment, deleteComment, enableEditCommentModal, updateActiveComment, updateActivePost, decrementCommentsCount } from '../../../store/actions';
import CommentActions from '../../CommentActions';

const Comment = props => {
  const comment = props.comment;

  const upvote = () => {
    CommentActions.voteOnComment(props.comment.id, props.post.id, 'upVote', () => {
      props.upvoteComment(props.comment.id);
      props.updateComments();
    });
  };

  const downvote = () => {
    CommentActions.voteOnComment(props.comment.id, props.post.id, 'downVote', () => {
      props.downvoteComment(props.comment.id);
      props.updateComments();
    });
  };

  const edit = () => {
    props.updateActivePost(props.post);
    props.updateActiveComment(props.comment);
    props.enableEditCommentModal();
  };

  const remove = () => {
    CommentActions.deleteComment(props.comment.id, props.post.id, () => {
      props.deleteComment(props.comment.id);
      props.updateComments();
      props.decrementCommentsCount(props.activePost.id);
      props.updateActivePost(Object.assign({}, props.activePost, {
        commentCount: props.activePost.commentCount - 1
      }));
      props.updateActiveComment({});
    });
  };

  return (
    <div className="component comment">

      <div className="comment-header">
        <div className="comment-meta">
          <span className="comment-author" title={'Author'}>{comment.author}</span>
          <time className="comment-date" title="Created date">{ammo.formatTime(comment.timestamp)}</time>
        </div>
      </div>

      <div className="comment-body">
        <p className="comment-content">{comment.body}</p>
      </div>

      <div className="comment-footer">
        <OptionsPanel
          type={'comment'}
          onUpvote={upvote}
          onDownvote={downvote}
          onEdit={edit}
          onDelete={remove}
        />

        <CounterVoteScore score={comment.voteScore}/>

      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  post: PropTypes.object
};

const mapStateToProps = state => {
  return {
    activePost: state.activePost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    upvoteComment: commentId => dispatch(upvoteComment(commentId)),
    downvoteComment: commentId => dispatch(downvoteComment(commentId)),
    editComment: (commentId, commentOptions) => dispatch(editComment(commentId, commentOptions)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    enableEditCommentModal: () => dispatch(enableEditCommentModal()),
    updateActiveComment: comment => dispatch(updateActiveComment(comment)),
    updateActivePost: post => dispatch(updateActivePost(post)),
    decrementCommentsCount: postId => dispatch(decrementCommentsCount(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
