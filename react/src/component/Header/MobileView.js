import React from 'react'
// materila-ui component

import IconButton from '@material-ui/core/IconButton'
import {Drawer} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles';


// icons 
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import NavLinks from './NavLinks';

const useStyles = makeStyles(theme => ({
  paper: {
    top: props => props.drawerPosition,
    width: "80%"
  }
}))




function MobileView() {
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [drawerPosition, setDrawerPosition] = React.useState(0)

  React.useEffect(() => {
  const rect = document.getElementById('appBar').getBoundingClientRect()
  setDrawerPosition(rect.top + rect.height)
  }, [])

  const props = {
    drawerPosition,
  }

  const classes = useStyles(props)


  return (
    <>
      <IconButton 
        onClick={()=>setOpenDrawer(!openDrawer)}
        >
          {
            openDrawer
            ? <CloseIcon fontSize="large" color="secondary" />
            : <MenuIcon fontSize="large" color="primary" />
          }
      </IconButton>
      <Drawer
      anchor="left"
      open={openDrawer}
      onClose={()=>setOpenDrawer(false)}
      classes={{paper: classes.paper}}
      variant='persistent'
      >
      <NavLinks 
        orientation="vertical"
        variant="fullWidth"
        TabIndicatorProps ={{
          style: {
            display: 'none'
          }
        }}
      
      />
      </Drawer>  
    </>
  )
}

export default MobileView
