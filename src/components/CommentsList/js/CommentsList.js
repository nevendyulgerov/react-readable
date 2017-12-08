import React from 'react';
import api from '../../../common/api';
import '../css/CommentsList.css';
import Comment from '../../Comment';
import { getCachedItems } from '../../../persistent-store';

class CommentsList extends React.Component {
  state = {
    comments: []
  };

  syncComments() {
    const post = this.props.post;
    const cachedComments = getCachedItems('comments', 'parentId', post.id);

    console.log(cachedComments);

    // ... if cached comments exist
    if ( cachedComments[0] ) {

      // ... set comments data from cache
      return this.setState({ comments: cachedComments });
    }

    // alternatively, retrieve comments from the server
    api.getPostComments(post.id, (err, comments) => {
      if ( err ) {
        return console.error(err);
      }
      // set comments data from server
      this.setState({ comments });
    });
  }

  componentDidMount() {
    this.syncComments();
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.post.id ) {
      this.syncComments();
    }
  }

  render() {
    return (
      <div className={`component comments-list ${this.props.isActive ? 'active' : ''}`}>
        <ul className="comments-list">

          {this.state.comments.map(comment => (
            <li className="comment" key={comment.id} data-id={comment.id}>
              <Comment comment={comment}/>
            </li>
          ))}

        </ul>
      </div>
    )
  };
}

export default CommentsList;
