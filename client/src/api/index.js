import axios from 'axios'
const API = axios.create({ baseURL: 'https://travel-memory-mern.herokuapp.com/' })

API.interceptors.request.use((req) => {

  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    // console.log("inside local storage profile", req.headers.authorization)
  }
  return req
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search/?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (_id, updatedPost) => API.patch(`/posts/${_id}`, updatedPost)
export const deletePost = (_id) => API.delete(`/posts/${_id}`)
export const likePost = (_id) => API.patch(`/posts/${_id}/likePost`)
export const comment = (_id, value) => API.post(`/posts/${_id}/commentPost`, { value })

export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post("/user/signup", formData)