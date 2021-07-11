import React from 'react'
import {Grid, Card, CardMedia, Typography, Button} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

import ProjectDialog from '../dialog/ProjectDialog'
import CUDProjectDialog from '../dialog/CUDProjectDialog'


const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",

    '& .MuiCardMedia-root': {
      backgroundImage: styleProps => `url(${styleProps.image})`,
    },
    '&:hover': {
      '& .MuiCardMedia-root': {
      backgroundImage: 'none',
    },
      cursor: 'pointer',

      '& $cardHover': {
      display: "block",
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: 'translate(-50%, -50%)'
    },
    }

  },
  cardHover: {
    display: "none"
  },

}))


function ProjectCard(props) {
  const{project, project_images, project_skills} = props
  const [openDetail, setOpenDetail] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const styleProps = { image: project_images.length ?  project_images[0].image : ""}
  const classes = useStyles(styleProps)

  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardMedia
        style={{height: "280px"}}
        component='div'
        />
        <div className={classes.cardHover}>
          <Typography variant="h6" style={{fontWeight: 800}}>{project}</Typography>
          <Typography variant="body1" color="secondary" style={{fontWeight: 400, marginTop: '10px'}}> 
            {project_skills.map(skill => skill.name).join(' / ')}
          </Typography>
          <Button variant="outlined" color="primary" style={{marginTop: '50px'}} onClick={() => setOpenDetail(true)}>Learn more</Button>
          <Button variant="outlined" color="secondary" style={{marginTop: '10px'}} onClick={() => setOpenEdit(true)}>Edit Project</Button>
        </div>
      </Card>
      <ProjectDialog openDetail={openDetail} setOpenDetail={setOpenDetail} {...props}/>
      <CUDProjectDialog open={openEdit} setOpen={setOpenEdit} action={{type: 'UPDATE', project: props}} />
    </Grid>
  )
}

export default ProjectCard
