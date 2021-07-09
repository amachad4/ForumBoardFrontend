import { Route, Switch, Redirect } from 'react-router-dom';

import AllPosts from './pages/AllPosts.js';
import PostDetail from './pages/PostDetail.js';
import NewPost from './pages/NewPost.js';
import NotFound from './pages/NotFound.js';
import Layout from './components/layout/Layout.js';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/posts' />
        </Route>
        <Route path='/posts' exact>
          <AllPosts />
        </Route>
        <Route path='/posts/:postId'>
          <PostDetail />
        </Route>
        <Route path='/new-post'>
          <NewPost />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
