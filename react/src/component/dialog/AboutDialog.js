
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




function AboutDialog({open, setOpen}) {
  const {profile, loading, setProfile} = GlobalContext()
  const [profileInput, setProfileInput] = React.useState(profile)
  const form = React.useRef(null)
  const history = useHistory()

  const classes = useStyles()


  const handleChange =  (e, index) => {

    const {name} = e.target
    let value = ''
    if (name === 'image' || name === 'resume') {
      value = e.target.files[0]
    } else {
      value = e.target.value
    }
    if (name.includes('skill', 0)) {
      let tempProfileInput = {...profileInput}
      tempProfileInput.skills[index] = {...tempProfileInput.skills[index], [name.substr(6)]: value}
      setProfileInput(tempProfileInput)
    } else {

      setProfileInput(prevState => {
      return {...prevState, [name]: value}
    })
    }
  }

  const handleNumber = (e, index) => { 
    const {value} = e.target
    const re = /^[0-9\b]+$/
    if ((value === '' || re.test(value)) && value > 0 && value <= 100) {
      handleChange(e, index)
    }
  }

  const handleAddSkill = e => {
    e.preventDefault()

    const temp = {...profileInput}
    temp.skills.push({
      name: '',
      proficiency: ''
    })

    setProfileInput(temp)
  }


  const handleSubmit = e => {
    e.preventDefault()
    let error = false

    for (const [key, value] of Object.entries(profileInput)) {
      if (key === 'skills') {
        value.forEach(item => {
          
          if (item.name === '' || item.proficiency === '') {
            error = true
          }
        })
      } else if(value === '') {
        return
      }
    }

    if (error)
      return
    error = false

     let formData = new FormData(form.current)
    
    

    const skills = formData.getAll('skill_name')
    const proficiency = formData.getAll('skill_proficiency')
    
    for (let i=0; i<skills.length; i++) {
      formData.append('updated_skills', JSON.stringify({name: skills[i], proficiency: proficiency[i]}))
    }

    formData.delete('skill_name')
    formData.delete('skill_proficiency')

    if (formData.get('image').name === "") {
      formData.delete('image')
    } 
    if (formData.get('resume').name === "") {
      formData.delete('resume')
    } 

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }

    const config = {
      headers: {
        Authorization: localStorage.getItem('access_token')
      ? 'JWT ' + localStorage.getItem('access_token')
      : null,	
        'Content-Type': 'multipart-form-data'
      }
    }
    const url = `https://osk7462-api.herokuapp.com/about/$
    {profileInput.id}/`

    axios.patch(url, formData, config)
    .then(response => setProfile(response.data))
    .catch(err => {
      error=true
      console.log(err)
    }) 

    if (!error)
      setOpen(false)
      history.push('/')
  }

  const handleSkillDelete = (e, id, index) => {
    e.preventDefault()
    axiosInstance.delete(`about/${id}/delete_skill/`)
    .then(response => {
        let tempProfileInput = {...profileInput}
        tempProfileInput.skills.splice(index,1)
        setProfileInput(tempProfileInput)
        console.log(response.data)
    })
    .catch(err => console.log(err))
  }


  React.useEffect(() => {
    setProfileInput(profile)
  }, [loading])


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
                  name="name"
                  label="name"  
                  value={profileInput.name}
                  error={!profileInput.name}
                  helperText={!profileInput.name ? '*this field cannot be empty': ''}
                  onChange={handleChange}
                />
                <TextField 
                  fullWidth
                  name="description"
                  label="description"  
                  value={profileInput.description}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  error={!profileInput.description}
                  helperText={!profileInput.description ? '*this field cannot be empty': ''}
                />

                <InputButton
                >
                  <input
                    type='file'
                    accept='image/*'
                    name='image'
                    onChange={handleChange}
                  />
                </InputButton>

                <InputButton            
                
                >

                  <input 
                    type='file'
                    accept='application/pdf'
                    name='resume'
                    onChange={handleChange}
                  />
                </InputButton>
                
                <Typography
                  variant='h6'
                  className={classes.skills}
                >
                  skills
                </Typography>
                 
                {
                  profileInput.skills.map( (skill, index) => {
                    
                    return (
                        <div key={index}
                          name='skill'
                          className={classes.skillRoot}
                        >
                          <TextField 
                            label='skill name'
                            name='skill_name'
                            value={skill.name}
                            onChange={ e => handleChange(e, index)}
                            error={!skill.name}
                            helperText={!skill.name ? '*this field cannot be empty': ''}
                          
                          />
                          <TextField 
                            label='proficiency'
                            name='skill_proficiency'
                            value={skill.proficiency}
                            onChange={(e => handleNumber(e, index))}
                            error={!skill.proficiency}
                            helperText={!skill.proficiency ? 'this field cannot be empty': ''}
                          />
                          <IconButton 
                            color='secondary'
                            onClick={(e)=>handleSkillDelete(e, skill.id, index)}
                            >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                    )
                  
                  })

                }
                <Button 
                  color='primary'
                  variant='contained'
                  onClick={(e) => handleAddSkill(e)}
                >
                Add another
                </Button>
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

export default AboutDialog
