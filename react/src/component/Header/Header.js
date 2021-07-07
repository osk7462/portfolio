import React from 'react'

// Muicomponent
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/styles'
import { GlobalContext } from '../../ContextApi'

// icons
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArchiveIcon from '@material-ui/icons/Archive';
import EditIcon from '@material-ui/icons/Edit';

// component
import MobileView from './MobileView'
import NavLinks from './NavLinks'
import EditMenu from './EditMenu'


const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '2px solid silver',

    '& .MuiToolbar-root': {
      display: 'flex'
    },
  },
  leftMenu: {
      flexGrow: 1
    },

}))


function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles()
  const {darkMode, setDarkMode, loggedIn, setLoggedIn, profile} = GlobalContext()
  const theme = useTheme()
  const view = useMediaQuery(theme.breakpoints.down('xs'))
  

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setLoggedIn(false)

  }

  return (
    <AppBar 
      position={view ? "fixed": "sticky"}
      className={classes.root}
      color="inherit"
      id="appBar"
      >
      <Toolbar 
        variant="dense"
        >
        <div 
          className={classes.leftMenu}
          > 
          {view
            ? <MobileView />
            : <NavLinks />
          }
        </div>
        <div >
          <IconButton
            color="primary"
            onClick={()=>window.open(profile.resume)}
          >
            <ArchiveIcon />
          </IconButton>
          <IconButton
           onClick={()=>setDarkMode(!darkMode)}
           >
            {darkMode ? <WbSunnyIcon/> : <Brightness3Icon />}
          </IconButton>
          
          {
            loggedIn 
            && <>
                <IconButton 
                  color="secondary"
                  onClick={(e)=> setAnchorEl(e.currentTarget)}
                >
                 <EditIcon />
                </IconButton>
                <IconButton 
                  color="secondary"
                  onClick={(e)=> handleLogout(e)}
                >
                  <ExitToAppIcon />
                </IconButton>
              
            </>
          }
          
        </div>
      </Toolbar>
      <EditMenu 
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </AppBar>

  )
}

export default Header
