import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Paper, Avatar, Typography, Button, Grid } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import { signin, signup } from '../../actions/auth'
import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'

const Auth = () => {
  const css = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initFormData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initFormData)
  const [errMessage, setErrMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      dispatch(signup(formData, navigate))
      if (formData.password !== formData.confirmPassword) {
        setErrMessage("passwords don't match")
        return
      }
    } else {
      dispatch(signin(formData, navigate))
    }

  }
  const handleChange = (e) => {
    setErrMessage("")
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleShowPassword = () => setShowPassword((preShowPassword) => !preShowPassword)

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    if (!isSignup) setFormData({ ...formData, confirmPassword: '' })
    setErrMessage("")
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: "AUTH", data: { result, token } })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (error) => {
    console.log("Google login fail", error)
  }
  return (
    <Container component="main" maxWidth='xs'>
      <Paper className={css.paper} elevation={3} >
        <Avatar className={css.avatar}><LockOutLinedIcon /></Avatar>
        {errMessage ? <Typography variant="h5" color="error" >{errMessage}</Typography> :
          <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Sign In'}</Typography>}
        <form className={css.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" onChange={handleChange} autoFocus half></Input>
                <Input name="lastName" label="Last Name" onChange={handleChange} half></Input>
              </>
            )
            }
            <Input name="email" label="Email" onChange={handleChange} type="email" autoFocus></Input>
            <Input name="password" label="Password" onChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}></Input>
            {isSignup && <Input name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" handleShowPassword={handleShowPassword}></Input>}
          </Grid>
          <Button type="submit" fullWidth variant='contained' color="primary" className={css.submit} >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="846338436127-ne0d3oh3ckvkhuug40ldvhjj42nbj1f3.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={css.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained"  >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent='flex-end' >
            <Grid item >
              <Button onClick={switchMode}>
                {isSignup ? "Alredy have an account, sign in" : "Don't have an account, Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>

  )
}

export default Auth
