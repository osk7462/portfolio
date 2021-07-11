import React from 'react'
import Home from './component/Home'
import Header from './component/Header/Header'
import About from './component/about/About'
import Project from './component/projects/Projects'
import Contact from './component/contact/Contact'


import {Paper} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.type === "light" 
      ? theme.palette.userBackground.light 
      : theme.palette.userBackground.dark,
  }
}))


function App() {
    const classes = useStyles()
  
  
  return (
      <Paper className={classes.root}>
        <Home />
        <Header />
        <About />
        <Project />
        <Contact />
      </Paper>
    
  )
}

export default App
