import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({ name, label, half, type, autoFocus, onChange, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={onChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === "password" ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} >
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        } : null}
      />
    </Grid>
  )
}

export default Input
