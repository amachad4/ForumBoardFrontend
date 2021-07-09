import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments.js';
import HighlightedPost from '../components/posts/HighlightedPost.js';
import LoadingSpinner from '../components/UI/LoadingSpinner.js';
import PostsContext from '../store/post-context.js';

const PostDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const postsCtx = useContext(PostsContext);
  const { postId } = params;
  const [loading, setLoading] = useState(false);
  const { postDetail, getPost, postsError } = postsCtx;

  useEffect(() => {
    setLoading(true);
    getPost(postId);
    setLoading(false);
  },[postId, getPost, setLoading]);

  return (
    <Fragment>
    <div className='centered'>
      { loading && <LoadingSpinner /> }
      { postsError && <h1>Could not load post, please try again later!</h1> }
    </div>
    { (!loading && !postsError) && <HighlightedPost text={postDetail.message} author={postDetail.username} title={postDetail.title} />}
      <Route path={match.path} exact>
        { (!loading && !postsError) && <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div> }
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default PostDetail;
