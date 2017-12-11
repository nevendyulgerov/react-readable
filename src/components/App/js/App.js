import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../css/App.css';
import { Route } from 'react-router-dom';
import ammo from '../../../common/libs/ammo';
import api from '../../../common/api';
import { addPosts, addCategories, normalizePersistentStoreData } from '../../../store/actions';
import { getPersistentStoreData } from '../../../persistent-store';
import Navigation from '../../Navigation';
import Breadcrumbs from '../../Breadcrumbs';
import Grid from '../../Grid';
import PostSingle from '../../PostSingle';
import ModalAddPost from '../../ModalAddPost';
import ModalEditPost from '../../ModalEditPost';
import ModalAddComment from '../../ModalAddComment';
import ModalEditComment from '../../ModalEditComment';

class App extends Component {

  componentDidMount() {
    const cachedPosts = getPersistentStoreData('posts');
    const cachedCategories = getPersistentStoreData('categories');

    ammo.sequence()
      .chain(seq => {
        const dataSource = cachedPosts[0] ? 'cache' : 'server';
        if ( dataSource === 'cache' ) {

          // update global state
          this.props.addPosts(cachedPosts);
          return seq.resolve();
        }

        // normalize persistent data for 'posts'
        this.props.normalizePersistentStoreData('posts');

        // normalize persistent data for 'comments'
        this.props.normalizePersistentStoreData('comments');

        api.getPosts((err, posts) => {
          if ( err ) {
            return console.error(err);
          }

          // update global state
          this.props.addPosts(posts);
          seq.resolve();
        });
      })
      .chain(seq => {
        const dataSource = cachedCategories[0] ? 'cache' : 'server';
        if ( dataSource === 'cache' ) {

          // update global state
          this.props.addCategories(cachedCategories);
          return seq.resolve();
        }

        // normalize persistent data for 'categories'
        this.props.normalizePersistentStoreData('categories');

        api.getCategories((err, res) => {
          if ( err ) {
            return console.error(err);
          }

          // update global state
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

          <Breadcrumbs
            pollInterval={300}
            enableIdToTitleConversion={true}
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
          <ModalEditComment/>
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
    addCategories: categories => dispatch(addCategories(categories)),
    normalizePersistentStoreData: key => dispatch(normalizePersistentStoreData(key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
