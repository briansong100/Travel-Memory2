import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ButtonBase from "@material-ui/core/ButtonBase"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutLined from '@material-ui/icons/ThumbUpAltOutlined'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useDispatch } from 'react-redux'


import { deletePost, likePost } from '../../../actions/posts'
import pic from "./default.png"

const Post = ({ post, setCurrentId }) => {
  const css = useStyles()
  // console.log(post)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [likes, setLikes] = useState(post?.likes)

  const user = JSON.parse(localStorage.getItem('profile'))

  const userId = (user?.result?.googleId || user?.result?._id)

  const hasLikePost = likes.find(like => like === userId)

  const handleLike = () => {
    dispatch(likePost(post._id))
    if (hasLikePost) {
      setLikes(likes.filter(id => id !== userId))
    } else {
      setLikes([...likes, userId])
    }
  }
  const Likes = () => {
    const len = likes.length
    if (len > 0) {
      return likes?.find(id => id === userId)
        ? (<><ThumbUpAltIcon fontSize="small" variant="body2" />
          {len > 2 ? `You & ${len - 1} others` : `${len}like${len > 1 ? 's' : ''}`}
        </>)
        : (<><ThumbUpAltOutLined fontSize="small" />{len}{len > 1 ? 'Likes' : 'Like'} </>)

    }
    return (<><ThumbUpAltOutLined fontSize="small" />&nbsp;Like</>)
  }

  const openPost = () => navigate(`/posts/${post._id}`)

  return (
    <Card className={css.card} raised elevation={6}>
      <ButtonBase className={css.cardAction} onClick={openPost} component="span" name="test">

        <CardMedia className={css.media} image={post.selectedFile || pic} title={post.title} />
        <div className={css.overlay} >
          <Typography variant="subtitle2">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
      </ButtonBase>
      {(userId === post?.creator) && (
        <div className={css.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(post._id) }}><MoreHorizIcon fontSize="medium" /></Button>
        </div>
      )}
      <ButtonBase className={css.cardAction} onClick={openPost} component="span" name="test">
        <div className={css.details} >
          <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
        </div >
        <Typography className={css.title} variant="subtitle1" gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" componet="p" gutterBottom noWrap={true}>{post.message} </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={css.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(handleLike)}>
          <Likes />
        </Button>
        {(userId === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />Delete
          </Button>
        )}
      </CardActions>
    </Card >
  )
}

export default Post
