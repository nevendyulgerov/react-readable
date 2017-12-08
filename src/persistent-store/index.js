import {
  ADD_POSTS,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_CATEGORIES,
  UPDATE_ACTIVE_CATEGORY,
  UPDATE_ACTIVE_POST,
  UPDATE_ACTIVE_COMMENT
} from '../store/actions';
import ammo from '../common/libs/ammo';

export const persistentStore = ammo.store('readable');

export const getCachedItem = (itemKey, key, value) => {
  const data = persistentStore.getItem(itemKey);
  const matches = data.filter(item => item[key] === value);
  return matches[0];
};

export const persistentStoreInterceptor = store => next => action => {
  const storeData = store.getState();

  switch ( action.type ) {
    case ADD_POSTS:
      persistentStore.setItem('posts', ammo.unique(storeData.posts, action.posts, 'id'));
      break;

    case EDIT_POST:
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, action.postOptions)));
      break;

    case DELETE_POST:
      persistentStore.setItem('posts', storeData.posts.filter(post => post.id !== action.postId));
      break;

    case UPVOTE_POST:
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, { voteScore: post.voteScore + 1})));
      break;

    case DOWNVOTE_POST:
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, { voteScore: post.voteScore - 1})));
      break;

    case ADD_CATEGORIES:
      persistentStore.setItem('categories', ammo.unique(storeData.categories, action.categories, 'name'));
      break;

    case UPDATE_ACTIVE_CATEGORY:
      persistentStore.setItem('activeCategory', action.category);
      break;

    case UPDATE_ACTIVE_POST:
      persistentStore.setItem('activePost', action.post);
      break;

    case UPDATE_ACTIVE_COMMENT:
      persistentStore.setItem('activeComment', action.comment);
      break;

    default:
      break;
  }

  return next(action);
};
