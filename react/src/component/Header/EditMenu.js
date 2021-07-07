import React from 'react'

// MuiComponent
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { MenuList } from '@material-ui/core'
import { ListItemIcon } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

// icons
import PersonIcon from '@material-ui/icons/Person';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

// component
import Dialog from './Dialog'


const useStyles = makeStyles(theme =>({
  paper: {
    marginTop: 35,
    [theme.breakpoints.down('xs')]: {
      marginTop: 45
    }
  }
}))


const EditMenu = ({anchorEl, setAnchorEl}) => {
  const [openDialog, setOpenDialog] = React.useState(false)
  const classes = useStyles()

  const handleDialog = (e) => {
    e.preventDefault()
    setAnchorEl(null)
    setOpenDialog(true)
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        classes={{paper: classes.paper}}
      >
      <MenuList>
        <MenuItem onClick={(e) => handleDialog(e)}>
          <ListItemIcon>
            <PersonIcon color="secondary" />
            <Typography varian="inherit">ABOUT</Typography>
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={(e) => handleDialog(e)}>
          <ListItemIcon>
            <LocalLibraryIcon color="secondary" />
            <Typography varian="inherit">PROJECT</Typography>
          </ListItemIcon>
        </MenuItem>
      </MenuList>
      </Menu>
      <Dialog 
        open={openDialog}
        setOpen={setOpenDialog}
      />
    </>
  )
}

export default EditMenu
