import React from 'react'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import makeStyles from '@material-ui/core/styles/makeStyles'


const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(3),

    '& .MuiTextField-root ': {
      margin: theme.spacing(1)
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1)
    },
    
  }
}))


const initialFormData = {
  name: '',
  email: '',
  message: ''
}

function ContactForm() {
  const [contactFormData, setContactFormData] = React.useState(initialFormData)
  const classes = useStyles()

  const handleChange = e => {
    const {name, value} = e.target
    setContactFormData (prevState => {
      return {...prevState, [name]:value}
    })
  }

  console.log({...contactFormData})

  return (
    <Grid item xs={12} sm={6} md={4} className = {classes.form}>
      <form>
        <TextField 
          label="Name"
          variant="outlined"
          name="name"
          size="small"
          fullWidth
          value={contactFormData.name}
          onChange={handleChange}
          // error={false}
          // helperText="*this field can not be empty"
        />  
        <TextField 
          label="email"
          variant="outlined"
          name="email"
          size="small"
          fullWidth
          value={contactFormData.email}
          onChange={handleChange}
        />
        <TextField 
          label="Your Message"
          variant="outlined"
          name="message"
          size="small"
          rows={5}
          multiline
          fullWidth
          value={contactFormData.message}
          onChange={handleChange}
        />
        <Button
        color="primary"
        variant="contained"
        fullWidth
        >
          Submit
        </Button>
      </form>
    </Grid>
  )
}

export default ContactForm
