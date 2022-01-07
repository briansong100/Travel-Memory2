import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    // console.log("request:", req.headers.authorization)

    const bearer = req.headers.authorization.split(" ")
    if (!bearer) {
      res.status(404).json({ message: "Unauthized connection." })
    } else if (bearer[0] !== "Bearer" || bearer.length !== 2) {
      res.status(404).json({ message: "Unauthorized request." })
    }

    const token = bearer[1]
    const isCustomAuth = token.length < 500;

    let decordedAuth
    if (isCustomAuth) {
      decordedAuth = jwt.verify(token, 'test')
      req.userId = decordedAuth?.id
    } else {
      decordedAuth = jwt.decode(token)
      req.userId = decordedAuth?.sub
    }
    // console.log(req.userId)
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Somthing went wrong." })
  }
}
export default auth