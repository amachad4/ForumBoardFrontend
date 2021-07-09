import React,{ useState } from 'react';
import axios from "axios";
import Card from '../UI/Card';
import { Prompt, useHistory } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './PostForm.module.css';

const DOMAIN = process.env.REACT_APP_DOMAIN;

const PostForm = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEnteringText, setIsEnteringText] = useState(false);
  const invalidInput = username === '' || title === '' || message === '';

  const handleSuccess = (response) => {
    setLoading(false);
    history.push('/posts');
  };

  const handleFail = (error) => {
    setLoading(false);
    setError(error+'');
  };

  function submitFormHandler(event) {
    event.preventDefault();

    setLoading(true);
    const enteredUsername = username;
    const enteredTitle = title;
    const enteredMessage = message;

    // optional: Could validate here
    if(invalidInput){
      setLoading(false);
      setError('Please do not leave any fields blank!');
    } else {
      setError('');
      const newPost = {
        username: enteredUsername,
        title: enteredTitle,
        message: enteredMessage
      }

      axios.post(DOMAIN+'/post/postmessage', newPost)
        .then(res => handleSuccess(res))
        .catch(error => handleFail(error));
    };
  };

  const handleOnFocus = () => {
    setError(false);
    setIsEnteringText(true);
  };

  const finishedEnteringHandler = () => {
    setIsEnteringText(false);
  };

  return (
    <React.Fragment>
      <Prompt when={isEnteringText} message={() => 'All entered data will be lost! Are you sure you want to navigate away from this page?'} />
      <div className='centered'>
        { loading && <LoadingSpinner /> }
        { error && <h1> { error } </h1> }
      </div>
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler} onFocus={handleOnFocus}>
          <div className={classes.control}>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor='message'>Message</label>
            <textarea id='text' rows='5' value={message} onChange={e => setMessage(e.target.value)}></textarea>
          </div>
          <div className={classes.actions}>
            <button className='btn' onClick={finishedEnteringHandler}>Add Post</button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default PostForm;
