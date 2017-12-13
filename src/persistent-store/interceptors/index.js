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
  DOWNVOTE_COMMENT,
  INCREMENT_COMMENTS_COUNT,
  DECREMENT_COMMENTS_COUNT,
  UPDATE_SORTING,
  NORMALIZE_PERSISTENT_STORE_DATA
} from '../../store/types';
import ammo from '../../common/libs/ammo';

import { initialState } from '../../store/reducers';

export const storeInterceptor = (persistentStore, storeData, action) => {

  switch ( action.type ) {
    case NORMALIZE_PERSISTENT_STORE_DATA:
      persistentStore.setItem(action.key, initialState[action.key]);
      break;

    case ADD_POSTS:
      persistentStore.setItem('posts', ammo.unique(storeData.posts, action.posts, 'id'));
      break;

    case EDIT_POST:
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, action.postOptions)));
      break;

    case DELETE_POST:
      console.log(action.postId);
      persistentStore.setItem('posts', storeData.posts.filter(post => post.id !== action.postId));
      break;

    case UPVOTE_POST:
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, { voteScore: post.voteScore + 1})));
      break;

    case DOWNVOTE_POST:
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, { voteScore: post.voteScore - 1})));
      break;

    case INCREMENT_COMMENTS_COUNT:
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, { commentCount: post.commentCount + 1})));
      break;

    case DECREMENT_COMMENTS_COUNT:
      persistentStore.setItem('posts', storeData.posts.map(post => post.id !== action.postId ? post : Object.assign({}, post, { commentCount: post.commentCount - 1})));
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

    case UPDATE_SORTING:
      persistentStore.setItem('sorting', {
        ...storeData.sorting,
        [action.sortType]: action.sortValue
      });
      break;

    default:
      break;
  }
};
