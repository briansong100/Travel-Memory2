import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import memories from '../../images/travel.png'
import useStyles from './styles'


function Navbar() {
  const css = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentPage } = useSelector((state) => state.posts)

  const navPage = `/posts/?page=${currentPage}`
  // const navPage = `/posts/\?page=${page}`
  let profile = localStorage.getItem('profile')
  if (profile === "{}") profile = null
  const [user, setUser] = useState(JSON.parse(profile))

  const handleLogout = () => {
    setUser(null)
    dispatch({ type: "LOGOUT" })
    navigate("/auth")
  }

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decordedToken = decode(token)
      if (decordedToken.exp * 1000 < new Date().getTime()) handleLogout()
    }

    let profile = localStorage.getItem('profile')
    if (profile === "{}") profile = null

    setUser(JSON.parse(profile))
  }, [location])



  return (
    <AppBar className={css.appBar} position='static' color='inherit' >
      <Link to={navPage} className={css.brandContainer} >
        <Typography className={css.heading} variant='h2' align='center' >Travels Memory</Typography>
        <img className={css.image} src={memories} alt='memories' height='60' />
      </Link>
      <Toolbar className={css.toolbar}>
        {user ? (
          <div className={css.profile}>
            <Avatar className={css.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={css.userName} variant='h6'>{user.result.name}</Typography>
            <Button className={css.logout} variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar >
  )
}

export default Navbar
