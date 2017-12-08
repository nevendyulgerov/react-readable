import React from 'react';
import Modal from '../../Modal';
import ammo from '../../../common/libs/ammo';
import slickNote from '../../../common/libs/slick-note';
import { connect } from 'react-redux'
import { addPosts } from '../../../store/actions';
import api from '../../../common/api';

class ModalAddPost extends React.Component {

  validateModal = () => {
    const postTitle = ammo.select('[name="post-title"]').get().value.trim();
    const postBody = ammo.select('[name="post-body"]').get().value.trim();
    const postAuthor = ammo.select('[name="post-author"]').get().value.trim();

    if ( ! postTitle || postTitle === '' || postTitle.length < 5 || postTitle.length > 100 ) {
      slickNote.init({
        type: 'error',
        title: 'Invalid post title',
        content: 'Make sure to insert a valid post title, containing between 5 and 100 letters.'
      });
      return false;
    }

    if ( ! postBody || postBody === '' || postBody.length < 10 || postBody.length > 200 ) {
      slickNote.init({
        type: 'error',
        title: 'Invalid post body',
        content: 'Make sure to insert a valid post body, containing between 10 and 200 letters.'
      });
      return false;
    }

    if ( ! postAuthor || postAuthor === '' || postAuthor.length < 3 || postAuthor.length > 100 ) {
      slickNote.init({
        type: 'error',
        title: 'Invalid post author',
        content: 'Make sure to insert a valid post author, containing between 3 and 100 letters.'
      });
      return false;
    }
    return true;
  };

  addPost = () => {
    const title = ammo.select('[name="post-title"]').get().value.trim();
    const body = ammo.select('[name="post-body"]').get().value.trim();
    const author = ammo.select('[name="post-author"]').get().value.trim();
    const category = ammo.select('[name="post-category"]').get().value.trim();

    api.addPost({ title, body, author, category }, (err, post) => {
      if ( err ) {
        return slickNote.init({
          type: 'error',
          title: 'Error',
          content: 'Your post was not added successfully. Please try again.'
        });
      }

      // update global state
      this.props.addPost(post);

      slickNote.init({
        type: 'success',
        title: 'New post added',
        content: 'Your post was added successfully.'
      });

      this.props.disableModal();
    });
  };

  render() {
    return (
      <div className="component add-post-modal">
        <Modal
          title={'Add Post'}
          type={'add-post'}
          isActive={this.props.isActive}
          beforeConfirm={this.validateModal}
          confirmModal={this.addPost}
          cancelModal={this.props.cancelModal}
          categories={this.props.categories}
          content={(
            <div className="modal-content">
              <div className="field">
                <input ref={input => input && input.focus()} name={'post-title'} placeholder={'Post Title'} title={'Post Title'}/>
              </div>
              <div className="field">
                <textarea name={'post-body'} placeholder={'Post Body'} title={'Post Body'}>
                </textarea>
              </div>
              <div className="field">
                <input name={'post-author'} placeholder={'Post Author'} title={'Post Author'}/>
              </div>
              <div className="field">
                <select name={'post-category'} title={'Post Category'}>
                  {this.props.categories.map(category => (
                    <option value={category.name} key={category.name}>{category.name}</option>
                  ))}
                </select>
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
    addPost: post => dispatch(addPosts([post]))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddPost);
