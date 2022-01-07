import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination, PaginationItem } from '@material-ui/lab'

import { getPosts } from '../actions/posts'
import useStyles from './styles'


const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector(state => state.posts)
  const css = useStyles();
  const dispatch = useDispatch()

  // console.log("paginat:page", page)
  async function getFetch(page) {
    await dispatch(getPosts(page))
  }
  useEffect(() => {
    if (page) getFetch(page)
  }, [page])

  return (
    <Pagination classes={{ ul: css.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      size='small'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts/?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate
