import React from 'react';
import classes from './CommentItem.module.css';

const CommentItem = (props) => {
  return (
    <div className={classes.item}>
      <p>username: {props.username}</p>
      <p className={classes.date}>Date Added: {new Date(props.datePosted).toDateString()}</p>
      <p className={classes.comment}>{props.comment}</p>
    </div>
  );
};

export default React.memo(CommentItem);
