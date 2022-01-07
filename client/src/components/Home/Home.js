
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Container, Grow, Grid, AppBar, TextField, Button } from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

import Pagination from '../Pagination'
import { getPostsBySearch } from '../../actions/posts'

import Form from '../../components/Form/Form'
import Posts from '../../components/Posts/Posts';

import useStyles from './styles'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const css = useStyles()

  const dispatch = useDispatch()
  const query = useQuery()

  const navigate = useNavigate()

  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])

  const handleAdd = (tag) => setTags([...tags, tag])
  const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete))

  const searchPosts = () => {
    if (search.trim() || tags.length > 0) {

      dispatch(getPostsBySearch({ search: search.trim(), tags: tags.join(",") }))
      setSearch('')
      setTags([])
      navigate(`/posts/search?searchQuery=${search.trim() || 'none'}&tags=${tags.join(",")}`)

    } else {
      navigate('/')
      // navigate('/posts/?page=1')
    }
  }
  const page = query.get('page') || 1

  const searchQuery = query.get('searchQuery')

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) searchPosts()
  }
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={css.gridContainer} container alignItems='stretch' spacing={3} >
          <Grid item xs={12} sm={12} md={9} lg={9} xl={10}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
            <AppBar className={css.appBarSearch} position="static" color="inherit">
              <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} variant="outlined" label="Search Tags" fullWidth />
              <Button onClick={searchPosts} variant="contained" className={css.searchButton} color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!(searchQuery || tags.length) && (<Paper className={css.pagination} elevation={6} ><Pagination page={page} /></Paper>)}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home