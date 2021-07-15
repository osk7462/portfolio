import React from 'react'
import {ThemeProvider as MuiThemeProvider, createTheme} from '@material-ui/core/styles'
import {GlobalContext} from './ContextApi'


function ThemeProvider({children}) {
  const {darkMode} = GlobalContext()
  const theme = createTheme ({
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
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
