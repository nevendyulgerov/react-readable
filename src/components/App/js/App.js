import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Grid from '../../Grid';
import ammo from '../../../common/libs/ammo';
import Navigation from '../../Navigation';
import '../css/App.css';
import api from '../../../common/api';
import PostSingle from '../../PostSingle';
import { connect } from 'react-redux';
import { addPosts, addCategories } from '../../../store/actions';
import { BrowserRouter } from 'react-router-dom';
import ModalAddPost from '../../ModalAddPost';
import {getCachedItem, persistentStorage} from '../../../store';
import ModalEditPost from '../../ModalEditPost';
import slickNote from '../../../common/libs/slick-note';

class App extends Component {
  state = {
    isAddPostModalActive: false,
    isEditPostModalActive: false,
    postForEdit: {}
  };

  componentDidMount() {

    // retrieve cached posts and categories
    const cachedPosts = persistentStorage.getItem('posts');
    const cachedCategories = persistentStorage.getItem('categories');

    // sequence:
    // - get posts (default source: localStorage)
    // - get categories (default source: localStorage)
    ammo.sequence()
      .chain(seq => {

        // ... if cached posts exist
        if ( cachedPosts[0] ) {

          // ... global state update from cached data
          this.props.addPosts(cachedPosts);
          return seq.resolve();
        }

        // alternatively retrieve posts from the server
        api.getPosts((err, posts) => {
          if ( err ) {
            return console.error(err);
          }

          // global state update from server data
          this.props.addPosts(posts);
          seq.resolve();
        });
      })
      .chain(() => {

        // ... if cached categories exist
        if ( cachedCategories[0] ) {

          // ... global state update from cached data
          return this.props.addCategories(cachedCategories);
        }

        // alternatively retrieve categories from the server
        api.getCategories((err, res) => {
          if ( err ) {
            return console.error(err);
          }

          // global state update from server data
          this.props.addCategories(res.categories);
        });
      })
      .execute();
  }

  setEditablePost = (postId, callback) => {
    const cachedPost = getCachedItem('posts', 'id', postId);

    if ( cachedPost ) {

      // local state update using cached data
      return this.setState({
        postForEdit: cachedPost,
        isEditPostModalActive: true
      }, () => {
        if ( ammo.isFunc(callback) ) {
          callback(cachedPost);
        }
      });
    }

    // alternatively, get post data from the server
    api.getPost(postId, (err, post) => {
      if ( err ) {
        return slickNote.init({
          type: 'error',
          title: 'Error',
          content: `Unable to retrieve data for post with id ${postId}`
        });
      }

      // local state update using server data
      this.setState({
        postForEdit: post,
        isEditPostModalActive: true
      }, () => {
        if ( ammo.isFunc(callback) ) {
          callback(post);
        }
      });
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="component app">

          <Navigation
            pollInterval={300}
            categories={this.props.categories}
            activateAddPostModal={() => this.setState({ isAddPostModalActive: true })}
          />

          {/* view: root */}
          <Route exact path={'/'} render={() => (
            <div className="view root">
              <Grid
                posts={this.props.posts}
                setEditablePost={this.setEditablePost}
              />
            </div>
          )}/>

          {/* view: category */}
          <Route exact path={'/:category'} render={() => (
            <div className="view category">
              <Grid
                posts={this.props.posts}
                category={this.props.activeCategory}
                setEditablePost={this.setEditablePost}
              />
            </div>
          )}/>

          {/* view: post */}
          <Route exact path={'/:category/:post_id'} render={() => (
            <div className="view single-post">
              <PostSingle
                post={this.state.postForEdit}
                setEditablePost={this.setEditablePost}
              />
            </div>
          )}/>

          {/* view: add-post */}
          <ModalAddPost
            isActive={this.state.isAddPostModalActive}
            cancelModal={() => this.setState({ isAddPostModalActive: false })}
            disableModal={() => this.setState({ isAddPostModalActive: false })}
          />

          {/* view: edit-post */}
          <ModalEditPost
            post={this.state.postForEdit}
            isActive={this.state.isEditPostModalActive}
            confirmModal={() => {
              this.setEditablePost(this.state.postForEdit.id);
              this.setState({ isEditPostModalActive: false });
            }}
            cancelModal={() => this.setState({ isEditPostModalActive: false })}
            disableModal={() => this.setState({ isEditPostModalActive: false })}
          />

        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    categories: state.categories,
    activeCategory: state.activeCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPosts: posts => dispatch(addPosts(posts)),
    addCategories: categories => dispatch(addCategories(categories))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
