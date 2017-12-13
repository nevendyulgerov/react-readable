import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import ammo from '../../../common/libs/ammo';
import slickNote from '../../../common/libs/slick-note';
import { connect } from 'react-redux'
import { editPost, disableEditPostModal, updateActivePost } from '../../../store/actions';
import PostActions from '../../PostActions';
import '../css/ModalEditPost.css';
const stateSchema = {
  title: '',
  body: '',
  isFocused: false
};

class ModalEditPost extends React.Component {
  state = Object.assign({}, stateSchema);

  validateModal = () => {
    const title = this.state.title.trim();
    const body = this.state.body.trim();

    if ( ! title || title === '' || title.length < 5 || title.length > 100 ) {
      slickNote.init({
        type: 'error',
        title: 'Error',
        content: 'Invalid post title. Make sure to insert a valid post title, containing between 5 and 100 letters.'
      });
      return false;
    }

    if ( ! body || body === '' || body.length < 10 || body.length > 200 ) {
      slickNote.init({
        type: 'error',
        title: 'Error',
        content: 'Invalid post body. Make sure to insert a valid post body, containing between 10 and 200 letters.'
      });
      return false;
    }
    return true;
  };

  editPost = callback => {
    const post = this.props.activePost;
    const title = this.state.title.trim();
    const body = this.state.body.trim();
    const postOptions = { title, body };

    PostActions.editPost(post.id, postOptions, () => {

      // nullify local state
      this.setState(Object.assign({}, stateSchema));

      // update global state
      this.props.editPost(post.id, postOptions);
      this.props.disableEditPostModal();
      this.props.updateActivePost(Object.assign({}, post, postOptions));

      slickNote.init({
        type: 'success',
        title: 'Success',
        content: 'Post edited successfully.'
      });

      if ( ammo.isFunc(callback) ) {
        callback();
      }
    });
  };

  updateField(event, field) {
    this.setState({
      isFocused: true,
      [field]: event.target.value || ''
    });
  }

  componentWillReceiveProps(newProps) {
    if ( ammo.isObj(newProps.activePost) ) {
      this.setState({
        title: newProps.activePost.title || '',
        body: newProps.activePost.body || ''
      });
    }
  }

  render() {
    return (
      <div className="component edit-post-modal">
        <Modal
          title={'Edit Post'}
          type={'edit-post'}
          isActive={this.props.isActive}
          beforeConfirm={this.validateModal}
          confirmModal={this.editPost}
          categories={this.props.categories}
          cancelModal={() => {
            this.props.disableEditPostModal();
            this.setState({ isFocused: false });
          }}
          content={(
            <div className="modal-content">
              <div className="field">
                <input
                  ref={input => {
                    if ( input && ! this.state.isFocused ) {
                      input.focus();
                    }
                  }}
                  name={'post-title'}
                  placeholder={'Post Title'}
                  title={'Post Title'}
                  value={this.state.title}
                  onChange={e => this.updateField(e, 'title')}
                />
              </div>
              <div className="field">
                <textarea
                  name={'post-body'}
                  placeholder={'Post Body'}
                  title={'Post Body'}
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
  categories: PropTypes.array,
  activePost: PropTypes.object
};

const mapStateToProps = state => {
  return {
    categories: state.categories,
    isActive: state.modals.editPost,
    activePost: state.activePost
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editPost: (postId, postOptions) => dispatch(editPost(postId, postOptions)),
    disableEditPostModal: () => dispatch(disableEditPostModal()),
    updateActivePost: post => dispatch(updateActivePost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPost);
