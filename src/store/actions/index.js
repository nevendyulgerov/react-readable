export const SYNC_LOCAL_STORE = 'SYNC_LOCAL_STORE';
export const ADD_POSTS = 'ADD_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const UPDATE_ACTIVE_POST = 'UPDATE_ACTIVE_POST';
export const UPDATE_ACTIVE_CATEGORY = 'UPDATE_ACTIVE_CATEGORY';

/**
 * @description Sync local store action
 * @param data
 * @returns {{type: string, data: *}}
 */
export const syncLocalStore = data => {
  return {
    type: SYNC_LOCAL_STORE,
    data
  };
};

/**
 * @description Add posts action
 * @param posts
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
 * @param postId
 * @returns {{type: string, category: *}}
 */
export const updateActivePost = postId => {
  return {
    type: UPDATE_ACTIVE_POST,
    postId
  };
};
