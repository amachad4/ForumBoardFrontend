import React, { useReducer, useCallback, useMemo } from 'react';
import axios from 'axios';

const DOMAIN = process.env.REACT_APP_DOMAIN;

const PostsContext = React.createContext({
  posts: [],
  comments: [],
  postDetail: [],
  postsError: Boolean,
  commentsError: Boolean,
  getPost: () => {},
  getAllComments: () => {},
  getAllPosts: () => {}
});

const reducer = (state, action) => {
  switch(action.type){
    case 'pushPost':
      return {
        ...state,
        posts: action.payload.post,
        postsError: false
      };
    case 'pushPostDetail':
      return {
        ...state,
        postDetail: action.payload.post,
        postsError: false
      }
    case 'pushComment':
      return {
        ...state,
        comments: action.payload.comment,
        commentsError: false
      };
    case 'postsError':
      return{
        ...state,
        postsError: true
      };
    case 'commentsError':
      return{
        ...state,
        commentsError: true
      };
    default:
      return state;
  };
};

export const PostsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer,{
    posts: [],
    comments: [],
    postDetail: [],
    postsError: false,
    commentsError: false
  });

  const getAllPosts = useCallback(() => {
    axios.get(DOMAIN+'/post/')
      .then(response => dispatch({ type:'pushPost', payload: { post: response.data } }))
      .catch(error => dispatch({ type: 'postsError', payload: { error: error } }));
  },[dispatch]);

  const getAllComments = useCallback((postId) => {
    axios.get(DOMAIN+'/post/comments/'+ postId)
      .then(response => dispatch({ type: 'pushComment', payload: { comment: response.data } }))
      .catch(error => dispatch({ type: 'commentsError', payload: { error: error } }));
  },[dispatch]);

  const getPost = useCallback((postId) => {
    axios.get(DOMAIN+'/post/'+ postId)
      .then(response => dispatch({ type:'pushPostDetail', payload: { post: response.data } }))
      .catch(error => dispatch({ type: 'postsError', payload: { error: error } }));
  },[dispatch]);

  const contextValue = {
    posts: useMemo(() => state.posts,[state.posts]),
    comments: useMemo(() => state.comments,[state.comments]),
    postDetail: useMemo(() => state.postDetail,[state.postDetail]),
    postsError: state.postsError,
    commentsError: state.commentsError,
    getPost: getPost,
    getAllComments: getAllComments,
    getAllPosts: getAllPosts
  };

  return(
    <PostsContext.Provider value={contextValue}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
