import React from 'react';
import '../css/Comment.css';
import ammo from '../../../common/libs/ammo';
import OptionsPanel from '../../OptionsPanel';
import CounterVoteScore from '../../CounterVoteScore';

class Comment extends React.Component {
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
            onUpvote={() => {
              console.log('upvote comment');
            }}
            onDownvote={() => {
              console.log('downvote comment');
            }}
            onEdit={() => {
              console.log('edit comment');
            }}
            onDelete={() => {
              console.log('delete comment');
            }}
          />

          <CounterVoteScore score={comment.voteScore}/>

        </div>
      </div>
    );
  }
}

export default Comment;
