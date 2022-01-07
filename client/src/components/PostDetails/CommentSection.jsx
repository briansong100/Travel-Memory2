import { useState, useRef } from 'react'
import { Typography, Button, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'

import useStyles from './styles'

const CommentSection = ({ post, userName }) => {
  // const user = JSON.parse(localStorage.getItem('profile'))
  const commentRef = useRef()
  const css = useStyles()
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleClick = async () => {
    const finalComment = `${userName}: ${comment}`
    const newComments = await dispatch(commentPost(finalComment, post._id))
    setComments(newComments)
    setComment('')
    commentRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  // console.log(user?.result?.name)
  return (
    <div>
      <div className={css.commentsOuterContainer} >
        <div className={css.commentsInnerContainer} style={{ width: '50%' }}>
          <Typography gutterBottom variant='h6' >Comments</Typography>
          {comments?.length > 0 ? (comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant='subtitle1'>
              <strong>{comment.split(": ")[0]}</strong>{comment.split(":")[1]}
            </Typography>
          ))) : (<Typography gutterBottom variant='subtitle1'>No Comment yet, How about you are the first one</Typography>)}
          <div ref={commentRef}></div>
        </div>


        <div style={{ width: '50%' }}>
          <Typography gutterBottom variant='h6' >Write a Comment</Typography>
          <TextField
            fullWidth
            multiline
            label='Comment'
            rows={4}
            variant='outlined'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {userName ? (
            <Button style={{ marginTop: '10px' }} variant="contained" fullWidth color="primary"
              disabled={!comment} onClick={handleClick}>Comment</Button>
          ) :
            (<Button style={{ marginTop: '10px' }} variant="contained" fullWidth color="primary"
              disabled >Comment(Login Requied)</Button>
            )
          }
        </div>

      </div>
    </div>


  )
}

export default CommentSection