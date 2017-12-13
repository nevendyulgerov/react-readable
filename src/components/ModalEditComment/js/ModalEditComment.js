import React from 'react';
import PropTypes from 'prop-types';
import '../css/ModalEditComment.css';
import Modal from '../../Modal';
import ammo from '../../../common/libs/ammo';
import slickNote from '../../../common/libs/slick-note';
import { connect } from 'react-redux'
import { editComment, disableEditCommentModal, updateActiveComment } from '../../../store/actions';
import CommentActions from '../../CommentActions';
const stateSchema = {
  body: '',
  isFocused: false
};

class ModalEditPost extends React.Component {
  state = Object.assign({}, stateSchema);

  validateModal = () => {
    const body = this.state.body.trim();
    if ( ! body || body === '' || body.length < 10 || body.length > 200 ) {
      slickNote.init({
        type: 'error',
        title: 'Error',
        content: 'Invalid comment body. Make sure to insert a valid comment body, containing between 10 and 200 letters.'
      });
      return false;
    }
    return true;
  };

  editComment = callback => {
    const post = this.props.activePost;
    const comment = this.props.activeComment;
    const body = this.state.body.trim();
    const commentOptions = { body };

    CommentActions.editComment(comment.id, post.id, commentOptions, () => {

      // nullify local state
      this.setState(Object.assign({}, stateSchema));

      // update global state
      this.props.editComment(comment.id, commentOptions);
      this.props.updateActiveComment(Object.assign({}, comment, commentOptions));
      this.props.disableEditCommentModal();

      slickNote.init({
        type: 'success',
        title: 'Success',
        content: 'Comment edited successfully.'
      });

      if ( ammo.isFunc(callback) ) {
        callback();
      }
    });
  };

  updateField(event, field) {
    this.setState({
      isFocused: true,
      [field]: event.target.value
    });
  }

  componentWillReceiveProps(newProps) {
    if ( ammo.isObj(newProps.activeComment) ) {
      this.setState({
        body: newProps.activeComment.body
      });
    }
  }

  render() {
    return (
      <div className="component edit-comment-modal">
        <Modal
          title={'Edit Comment'}
          type={'edit-comment'}
          isActive={this.props.isActive}
          beforeConfirm={this.validateModal}
          confirmModal={this.editComment}
          categories={this.props.categories}
          cancelModal={() => {
            this.props.disableEditCommentModal();
            this.setState({ isFocused: false });
          }}
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
                  placeholder={'Comment Body'}
                  title={'Comment Body'}
                  value={this.state.body}
                  onChange={e => this.updateField(e, 'body')}
                >
                </textarea>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

ModalEditPost.propTypes = {
  isActive: PropTypes.bool,
  categories: PropTypes.array
};

const mapStateToProps = state => {
  return {
    categories: state.categories,
    isActive: state.modals.editComment,
    activeComment: state.activeComment,
    activePost: state.activePost
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editComment: (commentId, commentOptions) => dispatch(editComment(commentId, commentOptions)),
    disableEditCommentModal: () => dispatch(disableEditCommentModal()),
    updateActiveComment: comment => dispatch(updateActiveComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPost);
