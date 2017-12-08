import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import ammo from '../../common/libs/ammo';
import {
  SYNC_LOCAL_STORE,
  ADD_POSTS,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_CATEGORIES,
  UPDATE_ACTIVE_CATEGORY,
  UPDATE_ACTIVE_COMMENT,
  UPDATE_ACTIVE_POST,
  MODAL_ADD_POST_ENABLED,
  MODAL_ADD_POST_DISABLED,
  MODAL_EDIT_POST_ENABLED,
  MODAL_EDIT_POST_DISABLED,
  MODAL_ADD_COMMENT_ENABLED,
  MODAL_ADD_COMMENT_DISABLED,
  MODAL_EDIT_COMMENT_ENABLED,
  MODAL_EDIT_COMMENT_DISABLED
} from '../actions';

const initialState = {
  posts: [],
  categories: [],
  activeCategory: '',
  activePost: '',
  modals: {
    addPost: false,
    ediPost: false,
    addComment: false,
    editComment: false
  }
};

/**
 * @description Local store reducer
 * @param state
 * @param action
 * @returns {{posts: Array, categories: Array, activeCategory: string, activePost: string}}
 */
const localStore = (state = initialState, action) => {
  switch (action.type) {
    case SYNC_LOCAL_STORE:
      return action.data;
    default:
      return state;
  }
};

/**
 * @description Posts reducer
 * @param state
 * @param action
 * @returns {*}
 */
const posts = (state = [], action) => {
  switch ( action.type ) {
    case ADD_POSTS:
      return ammo.unique(state, action.posts, 'id');

    case EDIT_POST:
      return state.map(post => {
        if ( post.id === action.postId ) {
          return Object.assign({}, post, action.postOptions);
        }
        return post;
      });

    case DELETE_POST:
      return state.filter(post => post.id !== action.postId);

    case UPVOTE_POST:
      return state.map(post => {
        if ( post.id === action.postId ) {
          return Object.assign({}, post, { voteScore: post.voteScore + 1 });
        }
        return post;
      });

    case DOWNVOTE_POST:
      return state.map(post => {
        if ( post.id === action.postId ) {
          return Object.assign({}, post, { voteScore: post.voteScore - 1 });
        }
        return post;
      });

    default:
      return state;
  }
};

/**
 * @description Categories reducer
 * @param state
 * @param action
 * @returns {*}
 */
const categories = (state = [], action) => {
  switch ( action.type ) {
    case ADD_CATEGORIES:
      return ammo.unique(state, action.categories, 'name');
    default:
      return state;
  }
};

/**
 * @description Active category reducer
 * @param state
 * @param action
 * @returns {string}
 */
const activeCategory = (state = '', action) => {
  switch ( action.type ) {
    case UPDATE_ACTIVE_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

/**
 * @description Active post reducer
 * @param state
 * @param action
 * @returns {string}
 */
const activePost = (state = '', action) => {
  switch ( action.type ) {
    case UPDATE_ACTIVE_POST:
      return action.post;
    default:
      return state;
  }
};

/**
 * @description Active comment reducer
 * @param state
 * @param action
 * @returns {string}
 */
const activeComment = (state = '', action) => {
  switch ( action.type ) {
    case UPDATE_ACTIVE_COMMENT:
      return action.comment;
    default:
      return state;
  }
};

/**
 * @description Modals reducer
 * @param state
 * @param action
 * @returns {*}
 */
const modals = (state = initialState.modals, action) => {
  switch ( action.type ) {
    case MODAL_ADD_POST_ENABLED:
      return Object.assign({}, state, { addPost: true });

    case MODAL_ADD_POST_DISABLED:
      return Object.assign({}, state, { addPost: false });

    case MODAL_EDIT_POST_ENABLED:
      return Object.assign({}, state, { editPost: true });

    case MODAL_EDIT_POST_DISABLED:
      return Object.assign({}, state, { editPost: false });

    case MODAL_ADD_COMMENT_ENABLED:
      return Object.assign({}, state, { addComment: true });

    case MODAL_ADD_COMMENT_DISABLED:
      return Object.assign({}, state, { addComment: false });

    case MODAL_EDIT_COMMENT_ENABLED:
      return Object.assign({}, state, { editComment: true });

    case MODAL_EDIT_COMMENT_DISABLED:
      return Object.assign({}, state, { editComment: false });

    default:
      return state;
  }
};


export default reduceReducers(
  combineReducers({
    posts,
    categories,
    activeCategory,
    activePost,
    activeComment,
    modals
  }),
  localStore
);
