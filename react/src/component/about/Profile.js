import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardMedia, Typography } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  
  root: {
    marginBottom: theme.spacing(3)
  }


}))

  
function Profile() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card style ={{width: "240px", marginBottom: "16px"}}>
        <CardMedia
          style={{height: "280px", border: '5px solid black',borderRadius: '10px' }}
          image="https://lp-cms-production.imgix.net/news/2019/02/taj-mahal-monkey.jpg"
        />
      </Card>
      <Typography variant="h4" style={{fontWeight: "600", opacity: "0.7"}}> who is this guy?</Typography>
      <Typography variant="subtitle1">Hi my name is osama khan. I am from Nepal. i like Coding this is my first portfolio website</Typography>
    </div>
  )
}

export default Profile
