import React from 'react'
import Profile from './Profile'
import Skills from './Skills'

import {Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Container from '../muiComponent/Container'
import {GlobalContext} from '../../ContextApi'

const useStyles = makeStyles(theme => ({
  component: {
    marginTop: theme.spacing(5)
  }
}))

function About() {
  const classes = useStyles()
  const {profile} = GlobalContext()

  return (
    <Container 
      id="about"
    >
      <Typography
       variant="h3"
       align= "center" 
      >
        About
      </Typography>
      <Grid
       container 
       justifyContent="space-around" 
       className={classes.component}
      >
        <Grid
         item 
         xs={12} 
         sm={4} 
        >
          <Profile
           image={profile.image} 
           description={profile.description} 
          />
        </Grid>
        
        <Grid
         item 
         xs={12} 
         sm={6}
        >
          {profile.skills.map((skill, index) => {
            return (<Skills
                     key={index} 
                     {...skill} 
                     />
                    )
            })
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default About
