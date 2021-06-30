import React from 'react'
import Home from './component/Home'
import Header from './component/Header/Header'
import About from './component/about/About'
import Project from './component/projects/Projects'
import Contact from './component/contact/Contact'

import {CssBaseline, Paper} from '@material-ui/core'

import {ThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles'
import {GlobalContext} from './ContextApi'




function App() {
    const {darkMode} = GlobalContext()
    const theme = createMuiTheme ({
    palette: {
      type: darkMode ? "dark": "light",
      
      userBackground: {
        border: {
          dark: 'black',
          light: '#b2dfdb'
        },
        light: '#e0f2f1',
        dark: '#424242'
      }

    }
  })

  const styles = {
    background: theme.palette.type === "light" ? theme.palette.userBackground.light : theme.palette.userBackground.dark,
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles}>
        <Home />
        <Header />
        <About />
        <Project />
        <Contact />
      </Paper>
    </ThemeProvider>
    
  )
}

export default App
