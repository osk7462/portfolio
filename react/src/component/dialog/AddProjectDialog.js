
import React from 'react'

// MuiComponent
import {Dialog as MuiDialog} from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import {DialogContent} from '@material-ui/core'
import {Typography} from '@material-ui/core'
import {Grid} from '@material-ui/core'
import {TextField as MuiTextField} from '@material-ui/core'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {GlobalContext} from '../../ContextApi'
import axiosInstance from '../../axios'
import axios from 'axios'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from 'react-router-dom'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import {Select} from '@material-ui/core'

const useStyles = makeStyles(theme=> ({
  paper: {
    position: 'absolute',
    top: 0,
  },
  input : {
    '& > *':{
      margin: theme.spacing(1)
    },
    '& form > *':{
      margin: theme.spacing(1)
    }
    
  },

  closeButton : {
    marginLeft: '90%',
    fontSize: '1.2rem'
  },

  skills : {
    fontWeight: 800,
    opacity: 0.8
  },

  skillRoot: {
    display: 'flex',
    alignItems: 'baseline',
  
    '& > *': {
      margin: theme.spacing(0.3)
    },
    
    
  },

  btnSubmit: {
    background: theme.palette.success.dark,
    color: 'white',

    '&:hover': {
      background: theme.palette.success.dark
    }
  },



}))



const TextField = ({...others}) => {
  return (
    <MuiTextField 
      size="small"
      variant="outlined"
      {...others}
    />
  )
}

const InputButton = ({children, ...others}) => {
  return (
    <Button 
      variant="contained"
      component="label"
      color='primary'
      {...others}
    >
      {children}
    </Button>
  )
}



function ProjectDialog({open, setOpen}) {
  const {profile, loading, setProfile} = GlobalContext()
  const {skills} = GlobalContext()
  const[selectedSkills, setSelectedSkills] = React.useState([])
  const history = useHistory()
  const form = React.useRef(null)
  const [image, setImage] = React.useState([])

  const classes = useStyles()

  const handleChangeMultiple = (e) => {
    const {options} = e.target
    const value = []
    for(let i=0; i<options.length; i++){
      if (options[i].selected) {
      value.push(options[i].value)
      }
    }
    setSelectedSkills(value)
  }

  const handleImage = (e) => {
    setImage(e.target.files)
  }
  
  console.log(image)

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(form.current)
    formData.append('slug', 'thisis_slug545')
    // formData.append('skill', JSON.stringify([{name: 'djano'}]))
    
    // for(let pair of formData.entries()){
    //   console.log(pair[0], pair[1])
    //   // if (pair[0] === 'project_images') {
    //   //   formData.append('images', pair[1].files[0])
    //   // }
    // }

    const config = {
      headers: {
        Authorization: localStorage.getItem('access_token')
      ? 'JWT ' + localStorage.getItem('access_token')
      : null,	
        'Content-Type': 'multipart-form-data'
      }
    }
    const url = `http://127.0.0.1:8000/projects/`

    axios.post(url, formData, config)
    .then(response => console.log(response))
    .catch(error => console.log(error))

  }

  return (
    <MuiDialog 
      open={open}
      maxWidth="sm"
      onClose={()=>setOpen(true)}
      classes = {{paper: classes.paper}}
    >
      <DialogTitle>
        <Button
         align="right"
         color='secondary'
         className={classes.closeButton}
         onClick={()=>setOpen(false)}
        >
          X
        </Button>
      </DialogTitle>

      <DialogContent>
        <Grid container justify="center" >
            <form ref={form}>
              <Grid item xs={12} className={classes.input}>
                <TextField 
                  fullWidth
                  name="project"
                  label="project"  
                />
                <TextField 
                  fullWidth
                  name="name"
                  label="name"  
                />
                <TextField 
                  fullWidth
                  name="description"
                  label="description"  
                  multiline
                  rows={5}
                />
                <TextField 
                  fullWidth
                  name="link"
                  label="link"  
                  
                />

                <InputButton>

                  <input 
                    type='file'
                    accept='image/*'
                    name='project_images'
                    multiple={true}
                    onChange={handleImage}
                  />
                </InputButton>
                
               
                <FormControl fullWidth >
                  <InputLabel shrink htmlFor="select-multiple-native">
                    Skills
                  </InputLabel>
                  <Select
                    name='skills' 
                    multiple
                    native
                    value={selectedSkills}
                    onChange={handleChangeMultiple}
                    inputProps={{
                      id: 'select-multiple-native',
                    }}
                  >
                    {skills.map(skill => (
                      <option key={skill.id} value={skill.name}>
                        {skill.name}
                      </option>
                    ))}
                  </Select>
              </FormControl>
              </Grid>
              
              <Button
                fullWidth
                variant='contained'
                className={classes.btnSubmit}
                onClick={(e)=>handleSubmit(e)}
              >
                submit
              </Button>
            </form>
        </Grid>



      </DialogContent>
      
    </MuiDialog>
  )
}

export default ProjectDialog
