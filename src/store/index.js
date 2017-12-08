import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import {
  ADD_POSTS,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_CATEGORIES,
  UPDATE_ACTIVE_CATEGORY,
  UPDATE_ACTIVE_POST,
  syncLocalStore
} from './actions';
import ammo from '../common/libs/ammo';

export const persistentStorage = ammo.store('readable');

const persistentStorageInterceptor = store => next => action => {
  const storeData = store.getState();

  switch ( action.type ) {
    case ADD_POSTS:
      persistentStorage.setItem('posts', ammo.unique(storeData.posts, action.posts, 'id'));
      break;

    case EDIT_POST:
      persistentStorage.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, action.postOptions)));
      break;

    case DELETE_POST:
      persistentStorage.setItem('posts', storeData.posts.filter(post => post.id !== action.postId));
      break;

    case UPVOTE_POST:
      persistentStorage.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, { voteScore: post.voteScore + 1})));
      break;

    case DOWNVOTE_POST:
      persistentStorage.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, { voteScore: post.voteScore - 1})));
      break;

    case ADD_CATEGORIES:
      persistentStorage.setItem('categories', ammo.unique(storeData.categories, action.categories, 'name'));
      break;

    case UPDATE_ACTIVE_CATEGORY:
      persistentStorage.setItem('activeCategory', action.category);
      break;

    case UPDATE_ACTIVE_POST:
      persistentStorage.setItem('activePost', action.postId);
      break;

    default:
      break;
  }

  return next(action);
};

export const store = createStore(
  reducers,
  compose(applyMiddleware(persistentStorageInterceptor))
);

export const getCachedItem = (itemKey, key, value) => {
  const data = persistentStorage.getItem(itemKey);
  const matches = data.filter(item => item[key] === value);
  return matches[0];
};

const syncPersistentStorage = () => {
  if ( ! persistentStorage.getData() ) {
    persistentStorage.setData(store.getState());
  }
  store.dispatch(syncLocalStore(persistentStorage.getData()));
};

syncPersistentStorage();
