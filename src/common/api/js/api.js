import ammo from '../../libs/ammo';
import uuid from 'uuid';

// locals
const apiRoot = 'http://localhost:3001';
const auth = (() => {
  const prefix = 'user';
  const suffix = [1, 2, 3].map(() => ammo.randomInclusive(0, 10)).join('');
  return `${prefix}_${suffix}`;
})();


/**
 * @description Retrieves the API's root url
 * @returns {string}
 */
export const getApiRoot = () => apiRoot;


/**
 * @description Add headers to requests
 * @returns {{Authorization: string}}
 */
const addHeaders = () => {
  return { 'Authorization': auth };
};


/**
 * @description Retrieves all posts
 * @param callback
 */
export const getPosts = callback => {
  ammo.request({
    url: `${apiRoot}/posts`,
    headers: addHeaders(),
    callback
  });
};


/**
 * @description Get post's details
 * @param id
 * @param callback
 */
export const getPost = (id, callback) => {
  ammo.request({
    url: `${apiRoot}/posts/${id}`,
    headers: addHeaders(),
    callback
  });
};


/**
 * @description Retrieve all categories
 * @param callback
 */
export const getCategories = callback => {
  ammo.request({
    url: `${apiRoot}/categories`,
    headers: addHeaders(),
    callback
  });
};


/**
 * @description Retrieve all posts from given category
 * @param category
 * @param callback
 */
export const getCategoryPosts = (category, callback) => {
  ammo.request({
    url: `${apiRoot}/${category}/posts`,
    headers: addHeaders(),
    callback
  });
};


/**
 * @description Add post
 * @param options
 * @param callback
 */
export const addPost = (options, callback) => {
  ammo.request({
    type: 'POST',
    url: `${apiRoot}/posts`,
    headers: addHeaders(),
    data: {
      id: uuid(),
      timestamp: Date.now(),
      title: options.title,
      body: options.body,
      author: options.author,
      category: options.category
    },
    callback
  });
};


/**
 * @description Vote on post
 * @param id
 * @param voteOption
 * @param callback
 */
export const voteOnPost = (id, voteOption, callback) => {
  ammo.request({
    type: 'POST',
    url: `${apiRoot}/posts/${id}`,
    headers: addHeaders(),
    data: { option: voteOption },
    callback
  });
};


/**
 * @description Edit post
 * @param id
 * @param options
 * @param callback
 */
export const editPost = (id, options, callback) => {
  ammo.request({
    type: 'PUT',
    url: `${apiRoot}/posts/${id}`,
    headers: addHeaders(),
    data: {
      title: options.title,
      body: options.body
    },
    callback
  });
};


/**
 * @description Delete post
 * @param id
 * @param callback
 */
export const deletePost = (id, callback) => {
  ammo.request({
    type: 'DELETE',
    url: `${apiRoot}/posts/${id}`,
    headers: addHeaders(),
    callback
  });
};


/**
 * @description Get post's comments
 * @param id
 * @param callback
 */
export const getPostComments = (id, callback) => {
  ammo.request({
    url: `${apiRoot}/posts/${id}/comments`,
    headers: addHeaders(),
    callback
  });
};


/**
 * @description Add post comment
 * @param options
 * @param callback
 */
export const addPostComment = (options, callback) => {
  ammo.request({
    type: 'POST',
    url: `${apiRoot}/comments`,
    headers: addHeaders(),
    data: {
      id: uuid(),
      timestamp: Date.now(),
      body: options.body,
      author: options.author,
      parentId: options.parentId
    },
    callback
  });
};


/**
 * @description Vote on a comment
 * @param id
 * @param voteOption
 * @param callback
 */
export const voteOnComment = (id, voteOption, callback) => {
  ammo.request({
    type: 'POST',
    url: `${apiRoot}/comments/${id}`,
    data: { option: voteOption },
    headers: addHeaders(),
    callback
  })
};


/**
 * @description Edit comment
 * @param id
 * @param options
 * @param callback
 */
export const editComment = (id, options, callback) => {
  ammo.request({
    type: 'PUT',
    url: `${apiRoot}/comments/${id}`,
    headers: addHeaders(),
    data: {
      timestamp: Date.now(),
      body: options.body
    },
    callback
  });
};


/**
 * @description Delete comment
 * @param id
 * @param callback
 */
export const deleteComment = (id, callback) => {
  ammo.request({
    type: 'DELETE',
    url: `${apiRoot}/comments/${id}`,
    headers: addHeaders(),
    callback
  });
};
