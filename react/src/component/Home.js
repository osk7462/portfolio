import React from 'react'


// component from material-ui
import {Paper, Box, Typography, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'

import Particles from "react-tsparticles";


const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.type === 'light' ? theme.palette.userBackground.light : theme.palette.userBackground.dark
  },
  typo: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5)
    },
  }
}))


function Home() {

  const classes = useStyles()

  const theme = useTheme()

  return (
    <Paper className={classes.root} id="home" color="inherit">
      
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    id='home'
    >
      <Typography variant="h3" align="center" className={classes.typo} >
      Hello, I'm <span style={{color:"#7986cb"}}>Osama Khan</span><br></br>I am a software developer
      </Typography>  
      <Button variant="outlined" href="#about" color="secondary">View my Work </Button>
  </Box>
  </Paper>
  )
}

export default Home
