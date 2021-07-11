
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
    marginBottom: theme.spacing(1),
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


const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')   
    .replace(/[^\w\-]+/g, '')   
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')           
    .replace(/-+$/, ''); 
}


const typeOfAction = (action) => {

  return action.type === 'UPDATE'
}

const getSelectedSkills = (action) => {
  if (action.type === 'UPDATE') {
    let skills = []
    action.project.project_skills.forEach((skill) => {
      skills.push(skill.name)
    } )
    return skills
  } 
  return []
} 

function CUDProjectDialog({open, setOpen, action}) {

  const {skills, setLoading} = GlobalContext()
  const[selectedSkills, setSelectedSkills] = React.useState(getSelectedSkills(action))
  const [update, setupdate] = React.useState(typeOfAction(action))
  const [project, setProject] = React.useState(action.project)


  const history = useHistory()
  const form = React.useRef(null)

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
  
  const handleChange = (e) => {
    const {name, value} = e.target
    
    setProject(prevState => {
      return {...prevState, [name]: value}
    })


  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(form.current)
    formData.append('slug', slugify(formData.get('project')))
    console.log(formData.get('images').name)
    if (formData.get('images').name === "") {
      formData.delete('images')
    }
    const config = {
      headers: {
        Authorization: localStorage.getItem('access_token')
      ? 'JWT ' + localStorage.getItem('access_token')
      : null,	
        'Content-Type': 'multipart-form-data'
      }
    }

    if (update) {
      const url = `http://127.0.0.1:8000/projects/${project.slug}/`
      axios.patch(url, formData, config)
      .then(response => {})
      .catch(error => console.log(error))
    } else {
      const url = `http://127.0.0.1:8000/projects/`
      axios.post(url, formData, config)
      .then(response => {})
      .catch(error => console.log(error))
    }
    // setOpen(false)
    // window.location.reload(true)
    // history.push('/')
  }

  const handleDelete = e => {
    e.preventDefault()
    axiosInstance.delete(`projects/${project.slug}/`)
    .then(response => {})
    .catch(error => console.log(error))
    setOpen(false)
    // window.location.reload(true)
    history.push('/')
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
                  inputProps={
                    update ? {
                      value: project.project,
                      onChange: handleChange
                    } : undefined
                  }  
                />
                <TextField 
                  fullWidth
                  name="name"
                  label="name"  
                  inputProps={
                    update ? {
                      value: project.name,
                      onChange: handleChange
                    } : undefined
                  }
                />
                <TextField 
                  fullWidth
                  name="description"
                  label="description"  
                  multiline
                  rows={5}
                  inputProps={
                    update ? {
                      value: project.description,
                      onChange: handleChange
                    } : undefined
                  }
                />
                <TextField 
                  fullWidth
                  name="link"
                  label="link"  
                  inputProps={
                    update ? {
                      value: project.link,
                      onChange: handleChange
                    } : undefined
                  }
                  
                />

                <InputButton>

                  <input 
                    type='file'
                    accept='image/*'
                    name='images'
                    multiple={true}
                    
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
              {
                update && 
                  <Button
                  fullWidth
                  color="secondary"
                  variant='contained'
                  onClick={(e)=>handleDelete(e)}
                >
                  delete
                </Button>
              }
            </form>
        </Grid>



      </DialogContent>
      
    </MuiDialog>
  )
}

export default CUDProjectDialog
