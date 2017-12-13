import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/ModalAddComment.css';
import api from '../../../common/api';
import ammo from '../../../common/libs/ammo';
import slickNote from '../../../common/libs/slick-note';
import { disableAddCommentModal, addComments, incrementCommentsCount, updateActivePost } from '../../../store/actions';
import Modal from '../../Modal';

const stateSchema = {
  body: '',
  author: '',
  isFocused: false
};

class ModalAddComment extends React.Component {
  state = Object.assign({}, stateSchema);

  validateModal = () => {
    const body = this.state.body.trim();
    const author = this.state.author.trim();

    if ( ! body || body === '' || body.length < 10 || body.length > 200 ) {
      slickNote.init({
        type: 'error',
        title: 'Invalid post body',
        content: 'Make sure to insert a valid comment body, containing between 10 and 200 letters.'
      });
      return false;
    }

    if ( ! author || author === '' || author.length < 3 || author.length > 100 ) {
      slickNote.init({
        type: 'error',
        title: 'Invalid post author',
        content: 'Make sure to insert a valid post author, containing between 3 and 100 letters.'
      });
      return false;
    }
    return true;
  };

  addComment = () => {
    const body = this.state.body.trim();
    const author = this.state.author.trim();
    const parentId = this.props.activePost.id;
    let existingComments = [];
    let newComment = {};

    ammo.sequence()
      .chain(seq => {
        api.getPostComments(parentId, (err, comments) => {
          if ( err ) {
            return console.log(err);
          }
          existingComments = comments;
          seq.resolve();
        })
      })
      .chain(seq => {
        api.addPostComment({ body, author, parentId }, (err, comment) => {
          if (err) {
            return slickNote.init({
              type: 'error',
              title: 'Error',
              content: 'Your comment was not added successfully. Please try again.'
            });
          }
          newComment = comment;
          seq.resolve();
        });
      })
      .chain(() => {
        const uniqueComments = ammo.unique(existingComments, [newComment], 'id');

        // nullify local state
        this.setState(Object.assign({}, stateSchema));

        // global store update
        this.props.addComments(uniqueComments);
        this.props.disableAddCommentModal();
        this.props.incrementCommentsCount(parentId);

        if ( parentId === this.props.activePost.id ) {
          this.props.updateActivePost(Object.assign({}, this.props.activePost, {
            commentCount: this.props.activePost.commentCount + 1
          }));
        }

        slickNote.init({
          type: 'success',
          title: 'New comment added',
          content: 'Your comment was successfully added.'
        });
      })
      .execute();
  };

  updateField(event, field) {
    this.setState({
      isFocused: true,
      [field]: event.target.value
    });
  }

  render() {
    return (
      <div className="component add-comment-modal">
        <Modal
          title={'Add Comment'}
          type={'add-comment'}
          isActive={this.props.isActive}
          beforeConfirm={this.validateModal}
          confirmModal={this.addComment}
          cancelModal={() => {
            this.props.disableAddCommentModal();
            this.setState({ isFocused: false });
          }}
          categories={this.props.categories}
          content={(
            <div className="modal-content">
              <div className="field">
                <textarea
                  ref={input => {
                    if ( input && ! this.state.isFocused ) {
                      input.focus();
                    }
                  }}
                  name={'comment-body'}
                  placeholder={'Comment body...'}
                  title={'Comment Body'}
                  value={this.state.body}
                  onChange={e => this.updateField(e, 'body')}
                >
                </textarea>
              </div>
              <div className="field">
                <input
                  name={'comment-author'}
                  placeholder={'Comment author...'}
                  title={'Comment Author'}
                  value={this.state.author}
                  onChange={e => this.updateField(e, 'author')}
                />
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

ModalAddComment.propTypes = {
  isActive: PropTypes.bool,
  categories: PropTypes.array,
  activePost: PropTypes.object
};

const mapStateToProps = state => {
  return {
    categories: state.categories,
    isActive: state.modals.addComment,
    activePost: state.activePost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    disableAddCommentModal: () => dispatch(disableAddCommentModal()),
    addComments: comments => dispatch(addComments(comments)),
    incrementCommentsCount: postId => dispatch(incrementCommentsCount(postId)),
    updateActivePost: post => dispatch(updateActivePost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddComment);
