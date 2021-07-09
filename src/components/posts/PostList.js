import React, { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PostItem from './PostItem.js';
import classes from './PostList.module.css';

const sortPosts = (posts, ascending) => {
  return posts.sort((postA, postB) => {
    if(ascending){
      return (postA.createdAt.toUpperCase() > postB.createdAt.toUpperCase() ? 1 : -1)
    } else {
      return(postA.createdAt.toUpperCase() < postB.createdAt.toUpperCase() ? 1 : -1)
    }
  });
};

const PostList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAsc = queryParams.get('sort') === 'asc';

  const sortedPosts = sortPosts(props.posts, isSortingAsc);

  const changeSortingHandler = () => {
    history.push(`/posts?sort=${isSortingAsc ? 'desc' : 'asc'}`);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>{`Sort ${isSortingAsc ? 'Newest' : 'Oldest'}`}</button>
      </div>
      <ul className={classes.list}>
        {sortedPosts.map((post) => (
          <PostItem
            key={post._id}
            id={post._id}
            username={post.username}
            title={post.title}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default React.memo(PostList);
