export const SYNC_LOCAL_STORE = 'SYNC_LOCAL_STORE';

export const ADD_POSTS = 'ADD_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UPDATE_ACTIVE_POST = 'UPDATE_ACTIVE_POST';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const UPDATE_ACTIVE_CATEGORY = 'UPDATE_ACTIVE_CATEGORY';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const UPDATE_ACTIVE_COMMENT = 'UPDATE_ACTIVE_COMMENT';

export const MODAL_ADD_POST_ENABLED = 'MODAL_ADD_POST_ENABLED';
export const MODAL_ADD_POST_DISABLED = 'MODAL_ADD_POST_DISABLED';
export const MODAL_EDIT_POST_ENABLED = 'MODAL_EDIT_POST_ENABLED';
export const MODAL_EDIT_POST_DISABLED = 'MODAL_EDIT_POST_DISABLED';
export const MODAL_ADD_COMMENT_ENABLED = 'MODAL_ADD_COMMENT_ENABLED';
export const MODAL_ADD_COMMENT_DISABLED = 'MODAL_ADD_COMMENT_DISABLED';
export const MODAL_EDIT_COMMENT_ENABLED = 'MODAL_EDIT_COMMENT_ENABLED';
export const MODAL_EDIT_COMMENT_DISABLED = 'MODAL_EDIT_COMMENT_DISABLED';

export const INCREMENT_COMMENTS_COUNT = 'INCREMENT_COMMENTS_COUNT';
export const DECREMENT_COMMENTS_COUNT = 'DECREMENT_COMMENTS_COUNT';

export const UPDATE_SORTING = 'UPDATE_SORTING';


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
