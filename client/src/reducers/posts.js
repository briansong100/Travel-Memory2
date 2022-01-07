
import { CREATE, UPDATE, FETCH_ALL, FETCH_POST, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes'

const postReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {

    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_ALL:
      return {
        ...state, posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }

    case FETCH_POST:
      // console.log("Fetch POST", action.payload.post)
      return { ...state, post: action.payload.post }
    case FETCH_BY_SEARCH:
      // console.log("Fetch by Search", action.payload.data)
      return { ...state, posts: action.payload.data }

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }

    case LIKE:
      return { ...state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post)) }

    case COMMENT:
      return { ...state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post)) }

    case UPDATE:
      return { ...state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post)) }

    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }

    default:
      return state;
  }
}

export default postReducer

