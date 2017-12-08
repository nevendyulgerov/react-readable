import React from 'react';
import Modal from '../../Modal';
import ammo from '../../../common/libs/ammo';
import slickNote from '../../../common/libs/slick-note';
import { connect } from 'react-redux'
import { editPost } from '../../../store/actions';
import PostActions from '../../PostActions';
import '../css/ModalEditPost.css';

class ModalEditPost extends React.Component {

  validateModal = () => {
    const modal = ammo.select('.component.edit-post-modal').get();
    const title = ammo.select('[name="post-title"]', modal).get().value.trim();
    const body = ammo.select('[name="post-body"]', modal).get().value.trim();

    if ( ! title || title === '' || title.length < 5 || title.length > 100 ) {
      slickNote.init({
        type: 'error',
        title: 'Invalid post title',
        content: 'Make sure to insert a valid post title, containing between 5 and 100 letters.'
      });
      return false;
    }

    if ( ! body || body === '' || body.length < 10 || body.length > 200 ) {
      slickNote.init({
        type: 'error',
        title: 'Invalid post body',
        content: 'Make sure to insert a valid post body, containing between 10 and 200 letters.'
      });
      return false;
    }
    return true;
  };

  editPost = callback => {
    const modal = ammo.select('.component.edit-post-modal').get();
    const title = ammo.select('[name="post-title"]', modal).get().value.trim();
    const body = ammo.select('[name="post-body"]', modal).get().value.trim();
    const postOptions = { title, body };

    PostActions.editPost(this.props.post.id, postOptions, () => {

      // update global state
      this.props.editPost(this.props.post.id, postOptions);

      slickNote.init({
        type: 'success',
        title: 'Success',
        content: 'Your post was edited successfully.'
      });

      this.props.disableModal();

      if ( ammo.isFunc(callback) ) {
        callback();
      }
    });
  };

  showModal = () => {
    const modal = ammo.select('.component.edit-post-modal').get();
    ammo.select('[name="post-title"]', modal).get().value = this.props.post.title;
    ammo.select('[name="post-body"]', modal).get().value = this.props.post.body;
  };

  render() {
    return (
      <div className="component edit-post-modal">
        <Modal
          title={'Edit Post'}
          type={'edit-post'}
          isActive={this.props.isActive}
          showModal={this.showModal}
          beforeConfirm={this.validateModal}
          confirmModal={() => {
            this.editPost(() => {
              if ( ammo.isFunc(this.props.confirmModal) ) {
                this.props.confirmModal();
              }
            });
          }}
          cancelModal={this.props.disableModal}
          categories={this.props.categories}
          content={(
            <div className="modal-content">
              <div className="field" key={'post-title'}>
                <input
                  ref={input => input && input.focus()}
                  name={'post-title'}
                  placeholder={'Post Title'}
                  title={'Post Title'}
                />
              </div>
              <div className="field" key={'post-body'}>
                <textarea
                  name={'post-body'}
                  placeholder={'Post Body'}
                  title={'Post Body'}
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

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editPost: (postId, postOptions) => dispatch(editPost(postId, postOptions))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPost);
