import React from 'react';
import { connect } from 'react-redux';
import '../css/Comment.css';
import ammo from '../../../common/libs/ammo';
import OptionsPanel from '../../OptionsPanel';
import CounterVoteScore from '../../CounterVoteScore';
import { upvoteComment, downvoteComment, editComment, deleteComment, enableEditCommentModal, updateActiveComment, updateActivePost, decrementCommentsCount } from '../../../store/actions';
import CommentActions from '../../CommentActions';

class Comment extends React.Component {

  upvote = () => {
    CommentActions.voteOnComment(this.props.comment.id, this.props.post.id, 'upVote', () => {
      this.props.upvoteComment(this.props.comment.id);
      this.props.updateComments();
    });
  };

  downvote = () => {
    CommentActions.voteOnComment(this.props.comment.id, this.props.post.id, 'downVote', () => {
      this.props.downvoteComment(this.props.comment.id);
      this.props.updateComments();
    });
  };

  edit = () => {
    this.props.updateActivePost(this.props.post);
    this.props.updateActiveComment(this.props.comment);
    this.props.enableEditCommentModal();
  };

  remove = () => {
    CommentActions.deleteComment(this.props.comment.id, this.props.post.id, () => {
      this.props.deleteComment(this.props.comment.id);
      this.props.updateComments();
      this.props.decrementCommentsCount(this.props.activePost.id);
      this.props.updateActivePost(Object.assign({}, this.props.activePost, {
        commentCount: this.props.activePost.commentCount - 1
      }));
      this.props.updateActiveComment({});
    });
  };

  render() {
    const comment = this.props.comment;

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
            onUpvote={this.upvote}
            onDownvote={this.downvote}
            onEdit={this.edit}
            onDelete={this.remove}
          />

          <CounterVoteScore score={comment.voteScore}/>

        </div>
      </div>
    );
  }
}

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
