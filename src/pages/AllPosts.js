import React,{ useEffect, useState, useContext } from 'react';
import PostList from '../components/posts/PostList.js';
import LoadingSpinner from '../components/UI/LoadingSpinner.js';
import NoPostsFound from '../components/posts/NoPostsFound.js';
import PostsContext from '../store/post-context.js';

const AllPosts = () => {
  const postsCtx = useContext(PostsContext);
  const [loading, setLoading] = useState(false);
  const { getAllPosts, posts, postsError } = postsCtx;

  useEffect(() => {
    setLoading(true);
    getAllPosts();
    setLoading(false);
  },[getAllPosts, setLoading])

  return(
    <React.Fragment>
      { loading && <div className='centered'>
        <LoadingSpinner />
        <p>Loading posts!</p>
        </div> }
      { posts.length === 0 && !postsError && <NoPostsFound /> }
      { postsError && <h1 className='centered'>Posts aren't loading now! Try again later.</h1> }
      { !loading && !postsError && posts.length > 0 && <PostList posts={posts} /> }
    </React.Fragment>
  );
};

export default AllPosts;
