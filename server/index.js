import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import postRouters from './routers/posts.js'
import userRouters from './routers/users.js'

import dotenv from 'dotenv'

const app = express();
dotenv.config()

app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

const PORT = process.env.PORT

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error))

app.use('/posts', postRouters)
app.use('/user', userRouters)  