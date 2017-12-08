import React from 'react';
import Modal from '../../Modal';
import slickNote from '../../../common/libs/slick-note';
import { connect } from 'react-redux'
import { addPosts, disableAddPostModal } from '../../../store/actions';
import api from '../../../common/api';
const stateSchema = {
  title: '',
  body: '',
  author: '',
  category: '',
  isFocused: false
};

class ModalAddPost extends React.Component {
  state = Object.assign({}, stateSchema);

  validateModal = () => {
    const title = this.state.title.trim();
    const body = this.state.body.trim();
    const author = this.state.author.trim();

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

  addPost = () => {
    const title = this.state.title.trim();
    const body = this.state.body.trim();
    const author = this.state.author.trim();
    const category = this.state.category.trim();

    // add post to the server data
    api.addPost({ title, body, author, category }, (err, post) => {
      if ( err ) {
        return slickNote.init({
          type: 'error',
          title: 'Error',
          content: 'Your post was not added successfully. Please try again.'
        });
      }

      // nullify local state
      this.setState(Object.assign({}, stateSchema));

      // update global state
      this.props.addPost(post);
      this.props.disableAddPostModal();

      slickNote.init({
        type: 'success',
        title: 'New post added',
        content: 'Your post was added successfully.'
      });
    });
  };

  updateField(event, field) {
    this.setState({
      isFocused: true,
      [field]: event.target.value
    });
  }

  render() {
    return (
      <div className="component add-post-modal">
        <Modal
          title={'Add Post'}
          type={'add-post'}
          isActive={this.props.isActive}
          beforeConfirm={this.validateModal}
          confirmModal={this.addPost}
          cancelModal={() => {
            this.props.disableAddPostModal();
            this.setState({ isFocused: false });
          }}
          categories={this.props.categories}
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
              <div className="field">
                <input
                  name={'post-author'}
                  placeholder={'Post Author'}
                  title={'Post Author'}
                  value={this.state.author}
                  onChange={e => this.updateField(e, 'author')}
                />
              </div>
              <div className="field">
                <select
                  name={'post-category'}
                  title={'Post Category'}
                  onChange={e => this.updateField(e, 'category')}
                >{this.props.categories.map((category, index) => (
                    <option
                      value={category.name}
                      key={category.name}
                      defaultValue={index === 0}
                    >{category.name}</option>
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
    categories: state.categories,
    isActive: state.modals.addPost
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(addPosts([post])),
    disableAddPostModal: () => dispatch(disableAddPostModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddPost);
