import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentsList from './CommentsList.js';
import LoadingSpinner from '../UI/LoadingSpinner.js';
import NewCommentForm from './NewCommentForm';
import PostsContext from '../../store/post-context.js';
import classes from './Comments.module.css';

const Comments = (props) => {
  const params = useParams();
  const postsCtx = useContext(PostsContext);
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const { comments, getAllComments, commentsError } = postsCtx;
  const { postId } = params;

  useEffect(() => {
    setLoading(true);
    getAllComments(postId);
    setLoading(false);
  },[getAllComments, setLoading, postId]);

  return (
    <section className={classes.comments}>
      { comments.length === 0 && <h1>There aren't any comments yet, be the first to leave a comment!</h1> }
      { !loading && !commentLoading && !commentsError && <NewCommentForm setCommentLoading={setCommentLoading} /> }
      { (loading || commentLoading) && <LoadingSpinner /> }
      { commentsError && <h1>Could not retrieve comments, please try again later!</h1> }
      { !loading && !commentsError && <CommentsList /> }
    </section>
  );
};

export default React.memo(Comments);
