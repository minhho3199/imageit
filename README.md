# ImageIt
A minimal Reddit/Facebook fusion clone app made using the following technologies: 
* [React](https://facebook.github.io/react/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

## Table Of Contents
* [Available Scripts](#available-scripts)
* [API](#api)

## Available Scripts

In the project directory, please run these scrips in order:

### `npm run uploads`

Create an uploads folder to store your uploaded pictures.<br>

### `npm run install`

Installs all the necessary npm packages for both the client and the server.

### `npm run start`

Runs node for connection to MongoDB backend.
You can also use `npm run server` if you want to use nodemon.

### `npm run client`

Runs the app in development environment

## API

There are two APIs, one for the Posts and one for the Users

### Posts API

```
  .get
  /api/posts/new
  Get all posts sorted by their upload time
  
  .get
  /api/posts/popular
  Get all posts sorted by their popularity
  
  .post
  /api/posts/create
  Create a new post
  
  .get
  /api/posts/comment/:postID
  Get all the comments of a post
  
  .post
  /api/posts/comment/:postID
  Create a comment for a post
  
  .get
  api/posts/comment/reply/:postID/:commentID
  Get all the replies of a comment in a post
  
  .post
  api/posts/comment/reply/:postID/:commentID
  Create a reply to a comment in a post
  
  .post
  api/posts/likes/:postID
  Place a new reaction for a post
  
  .delete
  api/posts/delete/:postID
  Delete a post
  
  .post
  api/posts/update/:postID
  Update a post
```

### Users API

```
  .post
  api/users/register
  Register a new user
  
  .post
  api/users/login
  Login the user
  
  .get
  api/users/keaderboards
  get the leaderboards of top 5 users with the most amount of posts
```
