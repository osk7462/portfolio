import React from 'react'
import {Grid, Card, CardMedia, Typography, Button} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

import ProjectDialog from './ProjectDialog'


const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",

    '& .MuiCardMedia-root': {
      backgroundImage: "url(https://lp-cms-production.imgix.net/news/2019/02/taj-mahal-monkey.jpg)",
    },
    '&:hover': {
      '& .MuiCardMedia-root': {
      backgroundImage: "none",
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


function ProjectCard() {
  const classes = useStyles()
  const [openDetail, setOpenDetail] = React.useState(false)
  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardMedia
        style={{height: "280px"}}
        src = "https://lp-cms-production.imgix.net/news/2019/02/taj-mahal-monkey.jpg"
        />
        <div className={classes.cardHover}>
          <Typography variant="h6" style={{fontWeight: 800}}>Project Name</Typography>
          <Typography variant="body1" color="secondary" style={{fontWeight: 400, marginTop: '10px'}}>React / Django</Typography>
          <Button variant="outlined" color="primary" style={{marginTop: '50px'}} onClick={() => setOpenDetail(true)}>Learn more</Button>
        </div>
      </Card>
      <ProjectDialog openDetail={openDetail} setOpenDetail={setOpenDetail}/>
    </Grid>
  )
}

export default ProjectCard
