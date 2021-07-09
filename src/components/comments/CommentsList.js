import React, { useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import CommentItem from './CommentItem';
import PostsContext from '../../store/post-context.js';
import classes from './CommentsList.module.css';

const sortComments = (comments, ascending) => {
  return comments.sort((commentA, commentB) => {
    if(ascending){
      return (commentA.createdAt > commentB.createdAt ? 1 : -1)
    } else {
      return(commentA.createdAt < commentB.createdAt ? 1 : -1)
    }
  });
};

const CommentsList = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const postsCtx = useContext(PostsContext);
  const { comments } = postsCtx;

  const queryParams = new URLSearchParams(location.search);

  const isSortingAsc = queryParams.get('sort') === 'asc';

  const sortedComments = sortComments(comments, isSortingAsc);

  const changeSortingHandler = () => {
    history.replace(`/posts/${params.postId}/comments/?sort=${isSortingAsc ? 'desc' : 'asc'}`);
  };

  return (
    <React.Fragment>
      { comments.length > 1 && <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>{`Sort ${isSortingAsc ? 'Newest' : 'Oldest'}`}</button>
      </div> }
      <div className={classes.comments}>

        {sortedComments.map((comment) => {
          return <CommentItem key={comment._id} comment={comment.comment} username={comment.username} datePosted={comment.createdAt} />
        })}
      </div>
    </React.Fragment>
  );
};

export default CommentsList;
