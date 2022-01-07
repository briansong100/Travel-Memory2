import { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { Typography, Paper, TextField, Button } from '@material-ui/core';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const css = useStyles()
  const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null)
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])


  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate))
    }
    clear()
  }

  const handleChange = (e) => { setPostData({ ...postData, [e.target.name]: e.target.value }) }
  const handleChangeTags = (e) => { setPostData({ ...postData, [e.target.name]: e.target.value.split(",") }) }

  const clear = () => {
    setCurrentId(null)
    setPostData({ title: '', message: '', tags: '', selectedFile: '' })
  }

  if (!user?.result?.name) {

    return (
      <Paper className={css.paper}>
        <Typography variant="h6" align="center" >
          Please sing In to create your travel memoris and likes other's memories
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={css.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${css.root} ${css.form}`} onSubmit={handleSubmit}>

        <Typography valiant='h6' >{currentId ? 'Edting' : 'Creating'} a Post</Typography >
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={handleChange} />
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={handleChange} />
        <TextField name='tags' variant='outlined' label='Tag,Tag,...' fullWidth value={postData.tags} onChange={handleChangeTags} />
        <div className={css.fileInput} >
          <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={css.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear} >Clear</Button>
      </form>
    </Paper >
  )
}
export default Form