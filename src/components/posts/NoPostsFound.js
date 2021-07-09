import React from 'react';
import classes from './NoPostsFound.module.css';

const NoPostsFound = () => {
  return (
    <div className={classes.noquotes}>
      <h1>No Posts found!</h1>
    </div>
  );
};

export default NoPostsFound;
