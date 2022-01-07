import * as api from '../api'
import { CREATE, UPDATE, FETCH_ALL, FETCH_POST, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes'

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)
    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
export const getPosts = (page) => async (dispatch) => {
  // console.log("try getPosts")
  try {
    dispatch({ type: START_LOADING })
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}
export const getPost = (id) => async (dispatch) => {
  // console.log("try getPost")
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: { post: data } })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  // console.log("Try searching getPosts")

  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } })

    dispatch({ type: END_LOADING })
    return data
  } catch (error) {
    console.log(error)
  }
}
export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)
    navigate(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}


export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }

}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)
    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(id, comment)
    dispatch({ type: COMMENT, payload: data })
    return data.comments

  } catch (error) {
    console.log(error)
  }
}
