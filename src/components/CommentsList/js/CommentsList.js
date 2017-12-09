import React from 'react';
import api from '../../../common/api';
import '../css/CommentsList.css';
import Comment from '../../Comment';
import sortBy from 'sort-by';
import { getCachedItems } from '../../../persistent-store';
import ammo from '../../../common/libs/ammo';

class CommentsList extends React.Component {
  state = {
    comments: []
  };

  syncComments(callback) {
    const post = this.props.post;
    const cachedComments = getCachedItems('comments', 'parentId', post.id);

    // ... if cached comments exist
    if ( cachedComments[0] ) {

      // ... set comments data from cache
      return this.setState({ comments: cachedComments }, () => ammo.isFunc(callback) && callback());
    }

    // alternatively, retrieve comments from the server
    api.getPostComments(post.id, (err, comments) => {
      if ( err ) {
        return console.error(err);
      }
      // set comments data from server
      this.setState({ comments }, () => ammo.isFunc(callback) && callback());
    });
  }

  componentDidMount() {
    this.syncComments(() => {
      if ( ammo.isFunc(this.props.onReady) ) {
        this.props.onReady();
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.post.id ) {
      this.syncComments();
    }
  }

  render() {
    const comments = this.state.comments.sort(sortBy('timestamp'));

    return (
      <div className={`component comments-list ${this.props.isActive ? 'active' : ''}`}>
        <ul className="comments-list">

          {comments.map(comment => (
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
