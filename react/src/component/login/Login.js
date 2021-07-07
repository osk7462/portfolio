import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {TextField as MuiTextField} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import makeStyles from '@material-ui/core/styles/makeStyles'

import axiosInstance from '../../axios'
import { useHistory } from 'react-router'
import {GlobalContext} from '../../ContextApi'


const useStyles = makeStyles(theme => ({
  root: {
    margin: `${theme.spacing(10)}px auto`,
    width: '40%',
    padding: `${theme.spacing(5)}px 0`,
    [theme.breakpoints.down('xs')]:{
      width: '100%'
    },

    '& .MuiGrid-root': {
      margin: '0 auto',
    },

    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
      
    },

    '& .MuiTypography-h5 ': {
      fontWeight: 900
    },

    '& .MuiButton-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
    }
  }

}))


const TextField = (props) => {
  const others = {...props}
  return (
  <MuiTextField
    fullWidth
    variant="outlined"
    size="small"
    {...others}
    />
  )
}





const initialLoginCredential = {
  username: '',
  password: ''
}

function Login() {
  const [loginCredential, setLoginCredential] = React.useState(initialLoginCredential)
  const [error, setError] = React.useState(false)
  const {setLoggedIn} = GlobalContext()
  const classes = useStyles()
  const history = useHistory()


  React.useEffect(()=> {
    const handleError = setTimeout(()=>{
      setError(false)
    }, 5000)  
    return () => clearTimeout(handleError)

  },[error])


  const handleSubmit = (e) => {
    e.preventDefault()
    axiosInstance
    .post('token/', {
      username: loginCredential.username,
      password: loginCredential.password
    })
    .then(response => {
      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)
      setLoggedIn(true)
      history.push('/')
    })
    .catch (function(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setError(true)
    })

  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setLoginCredential(prevState => ({
      ...prevState,
      [name]: value
    }))
  }


  return (
    <Paper
      className={classes.root}
    >
      <Grid 
        item 
        xs={11}
        
        >
      
        <Typography
          align="center"
          color="primary"
          variant="h5"
        >
          Login
        </Typography>
        {
        error
        && <Typography 
            color="secondary"
            align="center"

          >
            *username and password does not match
          </Typography>
       }

        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField 
            name="username"
            value={loginCredential.email}
            label="username"
            onChange = {handleChange}
          />
          <TextField 
            name="password"
            value={loginCredential.password}
            label="password"
            type="password"
            onChange = {handleChange}
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            type='submit'
          >
            Login
          </Button>
         </form>
      </Grid>
    </Paper>
  )
}

export default Login
