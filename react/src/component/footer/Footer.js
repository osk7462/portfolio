import React from 'react'

import {
  Container,
  Button,
  Typography,

}from '@material-ui/core'

import { 
  makeStyles 
} from '@material-ui/core/styles'

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.type === "light" ? theme.palette.userBackground.light : theme.palette.background.dark,
    paddingTop: theme.spacing(10),
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(1),
    position: 'relative',

    '& .MuiTypography-body1': {
      textTransform: 'uppercase',
      marginTop: theme.spacing(2)
    }

  },

  upButton: {
    height: theme.spacing(6),
    position: 'absolute',
    top:0,
    left: '50%',
    transform: "translate(-50%, -50%)"
  },

  social: {
    marginTop: theme.spacing(1)
  }


}))

function Footer() {
  const classes = useStyles()


  return (
    <Container
      justify="center"
      align='center'
      maxWidth={false}
      className={classes.root}
    >
      <Button
        className={classes.upButton}
        variant="contained"
        color="secondary"
        href="#home"
      >
        <ArrowUpwardIcon fontSize="large"/>
      </Button>

      <div className={classes.social}>
        <Button
          color="secondary"
          onClick={() => window.open('https://www.facebook.com/osk7462')}
        >
          <FacebookIcon fontSize="large"/>
        </Button>
        <Button
          color="secondary"
          onClick={() => window.open('https://www.linkedin.com/in/osk7462/')}
        >
          <LinkedInIcon fontSize="large"/>
        </Button>
        <Button
          color="secondary"        
          onClick={() => window.open('https://github.com/osk7462/')}
        > 
          <GitHubIcon fontSize="large"/>
        </Button>
        <Button
          color="secondary"
          href={'mailto: osk7462@gmail.com'}
        >
          <EmailIcon fontSize="large" />
        </Button>
      </div>

      <Typography
      >
        osama khan © {new Date().getFullYear()}
      </Typography>



    </Container>
  )
}

export default Footer
