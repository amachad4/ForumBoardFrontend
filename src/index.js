import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PostsContextProvider } from './store/post-context.js';

import './index.css';
import App from './App';

ReactDOM.render(<PostsContextProvider><BrowserRouter><App /></BrowserRouter></PostsContextProvider>, document.getElementById('root'));
