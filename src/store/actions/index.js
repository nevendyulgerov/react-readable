import {
  UPDATE_GLOBAL_STORE,
  NORMALIZE_PERSISTENT_STORE_DATA,
  ADD_POSTS,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  UPDATE_ACTIVE_POST,
  ADD_CATEGORIES,
  UPDATE_ACTIVE_CATEGORY,
  ADD_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  UPDATE_ACTIVE_COMMENT,
  MODAL_ADD_POST_ENABLED,
  MODAL_ADD_POST_DISABLED,
  MODAL_EDIT_POST_ENABLED,
  MODAL_EDIT_POST_DISABLED,
  MODAL_ADD_COMMENT_ENABLED,
  MODAL_ADD_COMMENT_DISABLED,
  MODAL_EDIT_COMMENT_ENABLED,
  MODAL_EDIT_COMMENT_DISABLED,
  INCREMENT_COMMENTS_COUNT,
  DECREMENT_COMMENTS_COUNT,
  UPDATE_SORTING
} from '../types';


/**
 * @description Update global store action
 * @param data
 * @returns {{type: string, data: *}}
 */
export const updateGlobalStore = data => {
  return {
    type: UPDATE_GLOBAL_STORE,
    data
  };
};


/**
 * @description Normalize persistent store data action
 * @returns {{type: string, data: *}}
 */
export const normalizePersistentStoreData = key => {
  return {
    type: NORMALIZE_PERSISTENT_STORE_DATA,
    key
  };
};

/**
 * @description Add posts action
 * @param {array} posts
 * @returns {{type: string, posts: *}}
 */
export const addPosts = posts => {
  return {
    type: ADD_POSTS,
    posts
  }
};

/**
 * @description Edit post action
 * @param postId
 * @param postOptions
 * @returns {{type: string, postId: *, postOptions: *}}
 */
export const editPost = (postId, postOptions) => {
  return {
    type: EDIT_POST,
    postId,
    postOptions
  };
};

/**
 * @description Upvote post action
 * @param postId
 * @returns {{type: string, postId: *}}
 */
export const upvotePost = postId => {
  return {
    type: UPVOTE_POST,
    postId
  };
};

/**
 * @description Downvote post action
 * @param postId
 * @returns {{type: string, postId: *}}
 */
export const downvotePost = postId => {
  return {
    type: DOWNVOTE_POST,
    postId
  };
};

/**
 * @description Delete post action
 * @param postId
 * @returns {{type: string, postId: *}}
 */
export const deletePost = postId => {
  return {
    type: DELETE_POST,
    postId
  };
};

/**
 * @description Add categories action
 * @param categories
 * @returns {{type: string, categories: *}}
 */
export const addCategories = categories => {
  return {
    type: ADD_CATEGORIES,
    categories
  };
};

/**
 * @description Update active category
 * @param category
 * @returns {{type: string, category: *}}
 */
export const updateActiveCategory = category => {
  return {
    type: UPDATE_ACTIVE_CATEGORY,
    category
  };
};

/**
 * @description Update active post action
 * @param post
 * @returns {{type: string, category: *}}
 */
export const updateActivePost = post => {
  return {
    type: UPDATE_ACTIVE_POST,
    post
  };
};

/**
 * @description Update active comment action
 * @param comment
 * @returns {{type: string, postId: *}}
 */
export const updateActiveComment = comment => {
  return {
    type: UPDATE_ACTIVE_COMMENT,
    comment
  };
};


/**
 * @description Enable add post modal action
 * @returns {{type: string}}
 */
export const enableAddPostModal = () => {
  return {
    type: MODAL_ADD_POST_ENABLED
  };
};

/**
 * @description Disable add post modal action
 * @returns {{type: string}}
 */
export const disableAddPostModal = () => {
  return {
    type: MODAL_ADD_POST_DISABLED
  };
};

/**
 * @description Enable edit post modal action
 * @returns {{type: string}}
 */
export const enableEditPostModal = () => {
  return {
    type: MODAL_EDIT_POST_ENABLED
  };
};

/**
 * @description Disable edit post modal action
 * @returns {{type: string}}
 */
export const disableEditPostModal = () => {
  return {
    type: MODAL_EDIT_POST_DISABLED
  };
};

/**
 * @description Enable add comment modal action
 * @returns {{type: string}}
 */
export const enableAddCommentModal = () => {
  return {
    type: MODAL_ADD_COMMENT_ENABLED
  };
};

/**
 * @description Disable add comment modal action
 * @returns {{type: string}}
 */
export const disableAddCommentModal = () => {
  return {
    type: MODAL_ADD_COMMENT_DISABLED
  };
};

/**
 * @description Enable edit comment modal action
 * @returns {{type: string}}
 */
export const enableEditCommentModal = () => {
  return {
    type: MODAL_EDIT_COMMENT_ENABLED
  };
};

/**
 * @description Disable edit comment modal action
 * @returns {{type: string}}
 */
export const disableEditCommentModal = () => {
  return {
    type: MODAL_EDIT_COMMENT_DISABLED
  };
};

/**
 * @description Add comments action
 * @param comments
 * @returns {{type: string, comments: *}}
 */
export const addComments = comments => {
  return {
    type: ADD_COMMENTS,
    comments
  };
};

/**
 * @description Edit post action
 * @param commentId
 * @param commentOptions
 * @returns {{type: string, commentId: *, commentOptions: *}}
 */
export const editComment = (commentId, commentOptions) => {
  return {
    type: EDIT_COMMENT,
    commentId,
    commentOptions
  };
};

/**
 * @description Upvote post action
 * @param commentId
 * @returns {{type: string, commentId: *}}
 */
export const upvoteComment = commentId => {
  return {
    type: UPVOTE_COMMENT,
    commentId
  };
};

/**
 * @description Downvote post action
 * @param commentId
 * @returns {{type: string, commentId: *}}
 */
export const downvoteComment = commentId => {
  return {
    type: DOWNVOTE_COMMENT,
    commentId
  };
};

/**
 * @description Delete post action
 * @param commentId
 * @returns {{type: string, commentId: *}}
 */
export const deleteComment = commentId => {
  return {
    type: DELETE_COMMENT,
    commentId
  };
};

/**
 * @description Increment comments count action
 * @param {string} postId
 * @returns {{type: string}}
 */
export const incrementCommentsCount = postId => {
  return {
    type: INCREMENT_COMMENTS_COUNT,
    postId
  };
};

/**
 * @description Decrement comments count
 * @param {string} postId
 * @returns {{type: string}}
 */
export const decrementCommentsCount = postId => {
  return {
    type: DECREMENT_COMMENTS_COUNT,
    postId
  };
};

/**
 * @description Update date sorting action
 * @param sortType
 * @param sortValue
 * @returns {{type: string, sortType: *}}
 */
export const updateSorting = (sortType, sortValue) => {
  return {
    type: UPDATE_SORTING,
    sortType,
    sortValue
  };
};
