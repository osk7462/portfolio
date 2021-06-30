import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography, Tab, Tabs, Grid} from '@material-ui/core'
import ProjectCard from './ProjectCard'
import Container from '../muiComponent/Container'



const useStyles = makeStyles(theme => ({
  tabs: {
    marginBottom: theme.spacing(2)
  }
}))



function Projects() {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = React.useState(0)

  return (
    <Container id="projects">
      <Typography variant="h3">Projects</Typography>
      <Tabs value={currentTab} centered variant='standard' onChange={(e, value) => setCurrentTab(value)} className={classes.tabs}>
        <Tab label="All" />
        <Tab label="React" />
        <Tab label="Django" />
        <Tab label="java" />
      </Tabs>
      <Grid container spacing={1} justify="center">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </Grid>

    </Container>
  )
}

export default Projects
