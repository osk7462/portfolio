import React from 'react'
import {AppBar, Toolbar, IconButton, Tabs, Tab, Link, useMediaQuery} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/styles'
import { GlobalContext } from '../../ContextApi'

import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import MobileView from './MobileView'

import NavLinks from './NavLinks'



const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '2px solid silver',
  }
}))


function Header() {
  const classes = useStyles()
  const {darkMode, setDarkMode} = GlobalContext()
  const theme = useTheme()
  const view = useMediaQuery(theme.breakpoints.down('xs'))
  
  return (
    <AppBar position={view ? "fixed": "sticky"} className={classes.root} color="inherit" id="appBar">
      <Toolbar variant="dense" style={{display: 'flex'}}>
        <div style={{flexGrow: '1'}}> 
          {view
            ? <MobileView />
            : <NavLinks />
          }
        </div>
        <div>
          <IconButton onClick={()=>setDarkMode(!darkMode)}>
            {darkMode ? <WbSunnyIcon/> : <Brightness3Icon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>

  )
}

export default Header
