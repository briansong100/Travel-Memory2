import { useEffect, useState } from 'react'
import FileBase from 'react-file-base64'
import { Paper, Typography, CircularProgress, Divider, Button, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, getPostsBySearch, updatePost } from '../../actions/posts'

import useStyles from './styles'
import CommentSection from './CommentSection'
import pic from "../Posts/Post/default.png"

const PostDetails = () => {
  // console.log("starting PostDetail")

  const user = JSON.parse(localStorage.getItem('profile'))
  const userId = (user?.result?.googleId || user?.result?._id)

  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const { id } = useParams()
  const [postData, setPostData] = useState({ _id: '', title: '', message: '', tags: '', selectedFile: '' })
  const [isEdit, setIsEdit] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const css = useStyles()
  useEffect(() => {
    // console.log(id, "아이디가 바뀌어 post 로드 함")
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if (post) {
      // console.log("post가 바뀌어 recomend posts를 로드함.")
      setPostData(post)
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags?.join(',') }))
    }
  }, [post])

  if (!post) return null

  const handleChange = (e) => { setPostData({ ...postData, [e.target.name]: e.target.value }) }

  const handleChangeTags = (e) => { setPostData({ ...postData, [e.target.name]: e.target.value.split(",") }) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userId) dispatch(updatePost(post._id, { ...postData, name: user?.result?.name }))
    setIsEdit(false)
  }

  const openPost = (id) => {
    setIsEdit(false)
    setPostData(posts.find(post => post._id === id))
    navigate(`/posts/${id}`)
  }

  if (isLoading) {
    return (
      <Paper className={css.loadingPaper} elevation={6} >
        <CircularProgress size='5em' />
      </Paper>
    )
  }

  const handleEdit = (flag) => {
    if (!post) return
    if (flag) setPostData(post)
    setIsEdit(flag);
  }

  return (
    <Paper className={css.paper} style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={css.card}>
        {isEdit ?
          (<div className={css.section}>
            <form autoComplete='off' noValidate className={`${css.root} ${css.form}`} onSubmit={handleSubmit}>
              <Typography valiant='h2' >Edting your Post</Typography >
              <TextField name='title' variant='outlined' label='Title' fullWidth value={postData?.title} onChange={handleChange} />
              <TextField name='message' variant='outlined' label='Message' fullWidth value={postData?.message} onChange={handleChange} />
              <TextField name='tags' variant='outlined' label='Tag,Tag,...' fullWidth value={postData?.tags} onChange={handleChangeTags} />
              <div className={css.fileInput} >
                <FileBase type='file' size="medium" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
              </div>
              <div className={css.buttonWrap} >
                <Button variant="contained" color="primary" size="medium" type="submit" >Submit</Button>
                <Button variant="contained" color="secondary" size="medium" onClick={() => handleEdit(false)} >Cancle</Button>
              </div>
            </form>
          </div>
          ) : postData._id && (
            <div className={css.section}>
              <Typography variant="h3" component="h2">{postData?.title}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{postData?.tags.map((tag) => `#${tag} `)}</Typography>
              <Typography className={css.message} gutterBottom variant="body1" noWrap={false} >{postData?.message}</Typography>
              <Typography variant="h6">Created by: {postData?.name}</Typography>
              <Typography variant="body1">{moment(postData?.createdAt).fromNow()}</Typography>
              {/* <Divider style={{ margin: '20px 0' }} /> */}
              {userId === postData?.creator && <Button onClick={() => handleEdit(true)} style={{ margin: '10px 0' }} variant="outlined" size="small" color="primary">Edit</Button>}
              <Divider style={{ margin: '10px 0' }} />
              <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
              <Divider style={{ margin: '10px 0' }} />
              <CommentSection post={post} userName={user?.result?.name} />
            </div>
          )}
        <div className={css.imageSection}>
          <img className={css.media} src={postData?.selectedFile || post?.selectedFile || pic} alt={postData?.title} />
        </div>
      </div>
      {
        (posts?.length) && (
          <div className={css.card2}>
            <Divider padding="10px" />
            <Typography gutterBottom variant="h5" align='center' style={{ margin: '20px 0' }}>You might also like:</Typography>
            <Divider />
            {/* <div className={css.section2} > */}
            <div className={css.recommendedPosts}>
              {posts.map(({ title, name, message, likes, selectedFile, _id }) => {
                if (_id !== postData?._id) {
                  return (
                    <div className={css.recommendedPost} onClick={() => openPost(_id)} key={_id}>
                      <Typography gutterBottom variant="h6" >{title}</Typography>
                      <Typography gutterBottom variant="subtitle2">{name}</Typography>
                      <Typography gutterBottom variant="subtitle2"  >{message.slice(1, 45)}</Typography>
                      <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                      <div className={css.recomendedImageWarp}>
                        <img className={css.recomendedImage} src={selectedFile || pic} alt="User's Memory" />
                      </div>
                    </div>
                  )
                } else { return null }
              })}
            </div>
            {/* </div> */}
          </div>
        )
      }
    </Paper >
  )
}

export default PostDetails
