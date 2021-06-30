import React from 'react'
import Profile from './Profile'
import Skills from './Skills'
import { skillsData } from '../../utility'

import {Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Container from '../muiComponent/Container'


const useStyles = makeStyles(theme => ({
  component: {
    marginTop: theme.spacing(5)
  }
}))

function About() {
  const classes = useStyles()

  return (
    <Container id="about">
      <Typography variant="h3" align= "center" >About</Typography>
      <Grid container justify="space-around" className={classes.component}>
        <Grid item xs={12} sm={4} >
          <Profile />
        </Grid>
        <Grid item xs={12} sm={6}>
          {skillsData.map(skill => {
            return <Skills key={skill.id} {...skill} />
          })}
        </Grid>
      </Grid>
    </Container>
  )
}

export default About
