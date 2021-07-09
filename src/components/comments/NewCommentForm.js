import React, { useState, useContext } from 'react';
import { Prompt, useParams } from 'react-router-dom';
import axios from 'axios';
import PostsContext from '../../store/post-context.js';
import classes from './NewCommentForm.module.css';

const DOMAIN = process.env.REACT_APP_DOMAIN;

const NewCommentForm = (props) => {
  const params = useParams();
  const postsCtx = useContext(PostsContext);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isEnteringText, setIsEnteringText] = useState(false);
  const invalidComment = !username || !comment;
  const { getAllComments } = postsCtx;

  const handleSuccess = (response) => {
    getAllComments(params.postId);
    props.setCommentLoading(false);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = comment;
    const enteredUsername = username;

    if(invalidComment){
      setError('Please do not leave any fields blank!');
    } else {
      setError('');
      setComment('');
      setUsername('');
      const newComment = {
        postId: params.postId,
        username: enteredUsername,
        comment: enteredText
      };
      props.setCommentLoading(true);
      axios.post(DOMAIN+'/post/postcomment', newComment)
        .then(res => handleSuccess(res))
        .catch(error => {
          props.setCommentLoading(false);
          setError(error);
        });
    }
  };

  const handleOnFocus = () => {
    setError('');
    setIsEnteringText(true);
  };

  const finishedEnteringHandler = () => {
    setIsEnteringText(false);
  };

  return (
    <React.Fragment>
      <Prompt when={isEnteringText} message={() => 'All entered data will be lost! Are you sure you want to navigate away from this page?'} />
      { error && <h1>{ error }</h1> }
      <form className={classes.form} onSubmit={submitFormHandler} onFocus={handleOnFocus}>

        <div className={classes.control}>
          <label htmlFor='username'>
            Enter a Username:
          </label>
          <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            type='text'
            id='username'
            name='username'
            placeholder='Enter a Username'
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='comment'>
            Enter your comment:
          </label>
          <textarea
            id='comment'
            rows='5'
            onChange={e => {setComment(e.target.value)}}
            value={comment}
            placeholder="Enter your comment here"
          >
          </textarea>
        </div>
        <div className={`${classes.actions}`}>
          <button className='btn' onClick={finishedEnteringHandler}>Add Comment</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default React.memo(NewCommentForm);
