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
import {persistentStore} from '../../../store';
import ModalAddPost from '../../ModalAddPost';
import ModalEditPost from '../../ModalEditPost';
import ModalAddComment from '../../ModalAddComment';

class App extends Component {
  state = {
    isAddPostModalActive: false,
    isEditPostModalActive: false,
    isAddCommentModalActive: false,
    commentForEdit: {}
  };

  componentDidMount() {

    // retrieve cached posts and categories
    const cachedPosts = persistentStore.getItem('posts');
    const cachedCategories = persistentStore.getItem('categories');

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

  render() {
    return (
      <BrowserRouter>
        <div className="component app">

          {/* navigation */}
          <Navigation
            pollInterval={300}
            categories={this.props.categories}
          />

          {/* root view */}
          <Route exact path={'/'} render={() => (
            <div className="view root">
              <Grid posts={this.props.posts}/>
            </div>
          )}/>

          {/* category view */}
          <Route exact path={'/:category'} render={() => (
            <div className="view category">
              <Grid
                posts={this.props.posts}
                category={this.props.activeCategory}
              />
            </div>
          )}/>

          {/* post view */}
          <Route exact path={'/:category/:post_id'} render={() => (
            <div className="view single-post">
              <PostSingle post={this.props.activePost}/>
            </div>
          )}/>

          {/* modals */}
          <ModalAddPost/>
          <ModalEditPost/>
          <ModalAddComment/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    categories: state.categories,
    activeCategory: state.activeCategory,
    activePost: state.activePost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPosts: posts => dispatch(addPosts(posts)),
    addCategories: categories => dispatch(addCategories(categories))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
