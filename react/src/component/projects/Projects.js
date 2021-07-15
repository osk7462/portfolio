import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography, Tab, Tabs, Grid} from '@material-ui/core'
import ProjectCard from './ProjectCard'
import Container from '../muiComponent/Container'
import {GlobalContext} from '../../ContextApi'



const useStyles = makeStyles(theme => ({
  tabs: {
    marginBottom: theme.spacing(2)
  }
}))


const tabs = [
  'All',
  'Django',
  'python',
  'java',

]

function Projects() {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = React.useState(0)
  const {projects, loading} = GlobalContext()
  const [tabProject, setTabProject] = React.useState(projects)

  const handleChange = (e, value) => {
    
    setCurrentTab(value)

    if (tabs[value] !== 'All') {
      let tempProjects = []

      projects.forEach(project => {
        project.project_skills.forEach(item => {
          if (item.name.toLowerCase() === tabs[value].toLowerCase() )
            tempProjects.push(project)
        })
      })
      setTabProject(tempProjects)
    } else {
      setTabProject(projects)
    }
  } 
  
  React.useEffect(() => {
    setTabProject(projects)
  }, [loading])


  return (
    <Container id="projects">
      <Typography variant="h3">Projects</Typography>
      <Tabs value={currentTab} centered variant='standard' onChange={(e, value) => handleChange(e, value)} className={classes.tabs}>
        {
          tabs.map((tab, index)=>{
            return <Tab key={index} label={tab}/>
          })
        }
      </Tabs>
      <Grid container spacing={1} justifyContent="center">
        {tabProject.map(project => {
          return (
              <ProjectCard key={project.slug} {...project}/>
          )
        })}
      </Grid>

    </Container>
  )
}

export default Projects
