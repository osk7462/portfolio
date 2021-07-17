
import React from 'react'

import {Dialog, Button, Divider} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import {makeStyles} from '@material-ui/core/styles'

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import LaunchIcon from '@material-ui/icons/Launch';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme => ({
//  these styles will be applied to materi
  root: {
    position: "absolute",
    top: 0,
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(15)
    },
  },

  dialogWidth: {
    maxWidth: 700,
    maxHeight: '100%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      width: '100%'
    },
  },


  content: {

    '& $slide': {
      '& img': {
        height: 350,
        width: "100%",
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
          height: 280
        },
      },
      '& .MuiButtonBase-root': {
      opacity: 0.4
      },
    },

    '& $info': {
      '& .MuiTypography-h5': {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '2rem'
      },
      '& .MuiTypography-subtitle1': {
        fontWeight: theme.typography.fontWeightBold,
        opacity: 0.6,
        fontSize: '1.2rem'
      },
    }
  },

  next: {
    position: "absolute",
    top: 300,
    right: 0,
    [theme.breakpoints.down('xs')]: {
      top: 220
    },
  },

  prev: {
    position: 'absolute',
    top: 300,
    left: 0,
    [theme.breakpoints.down('xs')]: {
      top: 220
    },

  },


  action: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2) 
  },

  slide: {},
  info: {
    width: '90%',
    margin: 'auto',
    marginBottom: theme.spacing(1)
  },



}))


function ProjectDialog(props) {
  const {openDetail, setOpenDetail, project, name, description, project_images, link, github} = props
  const classes = useStyles()
  const [slideImage, setSlideImage] = React.useState(0)

  const handleSilde = (e, name) => {
    e.preventDefault()
      if (name === 'next')
        setSlideImage(oldValue => {
          return ++oldValue % project_images.length
        })
      else {
        if (slideImage <= 0) {
          setSlideImage(project_images.length-1)
        } else {
          setSlideImage(oldValue=> {
            return --oldValue
          })
        }
      }
  }

  return (
    <Dialog 
      open={openDetail} 
      maxWidth="sm" 
      onClose={()=>setOpenDetail(false)} 
      classes={{paper: classes.root, paperWidthSm: classes.dialogWidth}} >
      <div
        className={classes.content}
        >
        <div className={classes.slide}> 
          <img 
            src={project_images.length ? project_images[slideImage].image : ''}
            alt="project"
           />
          <div className={classes.next}>
            <Button 
              size="medium"
              // color="secondary"
              variant="contained"
              onClick={(e, name="next") => handleSilde(e, name)}
              >
              <NavigateNextIcon fontSize='large'/>
            </Button>
          </div>
          <div className={classes.prev}>
            <Button
              size="medium"
              // color="secondary"
              variant="contained"
              onClick={(e, name="prev") => handleSilde(e, name)}
              >
              <NavigateBeforeIcon fontSize="large" />
            </Button>
          </div>
        </div>
        <div className={classes.info}>
          <Typography 
          variant="h5"
        
           >
          {project}
           </Typography>
        <Typography 
          variant="subtitle1"
        
        >
          {name}
        </Typography>
        <Divider/>
        <br />
        <Typography
          variant="body1"
        >
          {description}
        </Typography>
        <div className={classes.action}>
          <div>
            {
              link &&
              <Button
              variant="contained"
              color="secondary"
              startIcon={<LaunchIcon />}
              onClick={()=>window.open(link)}
                > 
                Visit Site
              </Button>
            }
              <Button
              variant="contained"
              color="secondary"
              startIcon={<GitHubIcon/>}
              onClick={()=>window.open(github)}
              style={{marginLeft: 10}}
              > 
              GitHub
            </Button>
          </div>
         

          <Button 
          style={{fontSize: '1.2rem'}}
          color="secondary" 
          onClick={()=>setOpenDetail(false)}
          className={classes.closeButton}
          >
          X
        </Button>
        
        </div>
        </div>
      </div>
      
    </Dialog>
  )
}

export default ProjectDialog