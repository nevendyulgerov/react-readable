# React Readable
A content and comment web app created with ReactJS. Users are able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users are also able to edit and delete posts and comments.

## Requirements
* npm

## How to Run:

1. [Download](https://github.com/nevendyulgerov/react-readable/archive/master.zip) or [Clone](https://github.com/nevendyulgerov/react-readable.git) the Repository.
2. Run `npm install` to install the project dependencies.
3. Run the app using `npm start`.
4. App becomes available at: `localhost:3000`.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The server is built in Node, but it is very simple.

To install and start the API server, run the following commands in this directory:

* npm install
* node server

## Using The Server

### Include An Authorization Header

All requests should use an **Authorization header** to work with your own data:

```js
fetch(
    url,
    {
        headers: { 'Authorization': 'whatever-you-want' }
    }
)
```

### Comment Counts
Posts retrieved in a list or individually now contain comment counts in the format `post: { commentCount: 0 }`.  This should make it easier to display the number of comments a post has without having to call the comments endpoint for each post.   This count is updated whenever a comment is added or deleted via the `POST /comments` or `DELETE /comments/:id` endpoints.

### API Endpoint

The following endpoints are available:

| Endpoints       | Usage          | Params         |
|-----------------|----------------|----------------|
| `GET /categories` | Get all of the categories available for the app. List is found in `categories.js`. Feel free to extend this list as you desire. |  |
| `GET /:category/posts` | Get all of the posts for a particular category. |  |
| `GET /posts` | Get all of the posts. Useful for the main page when no category is selected. |  |
| `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. |
| `GET /posts/:id` | Get the details of a single post. | |
| `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. |
| `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] |
| `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
| `GET /posts/:id/comments` | Get all the comments for a single post. | |
| `POST /comments` | Add a comment to a post. | **id** - Any unique ID. As with posts, UUID is probably the best here. <br> **timestamp** - [Timestamp] Get this however you want. <br> **body** - [String] <br> **author** - [String] <br> **parentId** - Should match a post id in the database. |
| `GET /comments/:id` | Get the details for a single comment. | |
| `POST /comments/:id` | Used for voting on a comment. | **option** - [String]: Either `"upVote"` or `"downVote"`.  |
| `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] |
| `DELETE /comments/:id` | Sets a comment's deleted flag to `true`. | &nbsp; |

## Important
Due to the light nature of the provided server, this app utilizes a custom localStorage implementation to persists its data on the client. This means that once, on first load, the app retrieves the needed data from the server, it will perform all subsequent read operations (using the GET method) on localStorage data.

This strategy guarantees that your data will persist between page reloads.

To normalize (clear) the persistent store for the app, simply remove all posts. If there are zero cached posts, the app will normalize its localStorage data and will retrieve the latest server data.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
