import React from 'react';
import classes from './HighlightedPost.module.css';

const HighlightedPost = (props) => {
  return (
    <figure className={classes.post}>
      <figcaption>username: {props.author}</figcaption>
      <h1>{props.title}</h1>
      <hr />
      <p>{props.text}</p>
    </figure>
  );
};

export default React.memo(HighlightedPost);
