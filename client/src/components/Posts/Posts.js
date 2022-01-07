
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux'

import Post from './Post/Post'
import useStyles from './styles'

const Posts = ({ setCurrentId }) => {

  const css = useStyles()
  const { posts, isLoading } = useSelector((state) => state.posts)

  if (!posts.length && !isLoading) return "No posts"
  return (
    !posts?.length ? <CircularProgress /> : (
      <Grid className={css.mainContainer} container alignItems='stretch' spacing={3} >
        {posts.map(post => (
          <Grid item key={post._id} xs={12} sm={12} md={4} lg={3} xl={3} >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))
        }
      </Grid >
    )
  )
}

export default Posts
