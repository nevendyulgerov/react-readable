import {
  ADD_POSTS,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_CATEGORIES,
  UPDATE_ACTIVE_CATEGORY,
  UPDATE_ACTIVE_POST,
  UPDATE_ACTIVE_COMMENT,
  ADD_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
} from '../store/actions';
import ammo from '../common/libs/ammo';

export const persistentStore = ammo.store('readable');

export const getCachedItems = (itemKey, key, value) => {
  const data = persistentStore.getItem(itemKey);
  return data.filter(item => item[key] === value);
};

export const getCachedItem = (itemKey, key, value) => {
  const matches = getCachedItems(itemKey, key, value);
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

    case ADD_COMMENTS:
      const parentId = action.comments[0] ? action.comments[0].parentId : '';
      persistentStore.setItem('comments', ammo.unique(storeData.comments, action.comments, 'id'));
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== parentId ? post : Object.assign({}, post, { commentCount: action.comments.length}) ));
      break;

    case EDIT_COMMENT:
      persistentStore.setItem('comments', storeData.comments.map(comment => comment.id !== action.commentId ? comment : Object.assign({}, comment, action.commentOptions)));
      break;

    case DELETE_COMMENT:
      persistentStore.setItem('comments', storeData.comments.filter(comment => comment.id !== action.commentId));
      break;

    case UPVOTE_COMMENT:
      persistentStore.setItem('comments', storeData.comments.map(comment => comment.id !== action.commentId ? comment : Object.assign({}, comment, { voteScore: comment.voteScore + 1})));
      break;

    case DOWNVOTE_COMMENT:
      persistentStore.setItem('comments', storeData.comments.map(comment => comment.id !== action.commentId ? comment : Object.assign({}, comment, { voteScore: comment.voteScore - 1})));
      break;

    default:
      break;
  }

  return next(action);
};
