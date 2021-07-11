import React from 'react'
import {Container  as MuiContainer} from '@material-ui/core/'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme=> ({
  root: {
    paddingTop: theme.spacing(10),
    background: theme.palette.type === "light" ? theme.palette.userBackground.light : theme.palette.userBackground.dark,
    borderTop: `3px solid ${theme.palette.type === 'light' ? theme.palette.userBackground.border.light :  theme.palette.userBackground.border.dark}`,
    paddingBottom: theme.spacing(5),

    '& .MuiTypography-h3':{
      fontWeight: 800,
      textTransform: 'uppercase',
      marginBottom: theme.spacing(3)
    },

    '& .MuiTypography-body1':{
      fontWeight: 800,
    },
  }
}))



function Container({children, ...other}) {
  const classes = useStyles();


  return (
   <MuiContainer
    justify="center" 
    align="center"
    maxWidth={false}
    className={classes.root}
    {...other}
   
   >
     {children}
   </MuiContainer>
  )
}

export default Container
