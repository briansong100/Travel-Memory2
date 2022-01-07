import e from 'express'
import mongoose from 'mongoose'
import PostMessage from '../models/posts.js'

export const getPosts = async (req, res) => {
  const { page } = req.query
  // console.log("recevied posts request")
  try {
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await PostMessage.countDocuments({})
    const posts = await PostMessage.find().sort({ _id: -1 }).skip(startIndex).limit(LIMIT)
    // console.log("posts")
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
export const getPost = async (req, res) => {
  const { id } = req.params
  // console.log("recevied post request")
  try {
    const post = await PostMessage.findById(id)
    // console.log("post")
    res.json(post)

  } catch (error) {
    res.status(404).json({ message: error.message })
  }

}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query
  // console.log("recevied search post request")
  // console.log(searchQuery, tags.split(','))
  try {
    const title = new RegExp(searchQuery, 'i')
    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
    // console.log("searched posts")
    res.json({ data: posts })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }

}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

  try {
    await newPost.save();
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id:${_id}`)
  // console.log(_id)
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  // console.log("after update", updatedPost)
  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id:${_id}`)
  await PostMessage.findByIdAndRemove(_id, { new: true })
  res.json({ message: "Post deleted sucessfully" })
}
export const commentPost = async (req, res) => {
  const { id } = req.params
  const { value } = req.body

  // console.log("id value", id, value)
  const post = await PostMessage.findById(id)

  post.comments.push(value)

  const upDatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

  res.json(upDatedPost)
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params
  if (!req.userId) return res.status(404).json({ message: 'Not authenticated ' })

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id:${_id}`)
  const post = await PostMessage.findById(_id)

  const index = post.likes.findIndex((id) => id === String(req.userId))
  // console.log(index)
  if (index === -1) {
    post.likes.push(req.userId)
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }
  // console.log(post.likes)

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
  res.json(updatedPost)
}