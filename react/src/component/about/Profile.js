import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'



const useStyles = makeStyles(theme => ({
  
  root: {
    marginBottom: theme.spacing(3),

    '& .MuiCard-root':{
      width: theme.spacing(30),
      marginBottom: theme.spacing(2)
    },
    '& .MuiCardMedia-root':{
      height: theme.spacing(35), 
      border: '5px solid grey',
      borderRadius: '10px' 
    },

    '& .MuiTypography-h4': {
      fontWeight: "600", opacity: "0.7"
    }

  }


}))

  
function Profile({image, description}) {
  const classes = useStyles()
  

  return (
    <div 
      className={classes.root}
    >
      <Card >
        <CardMedia
          component="img"
          image={image}
        />
      </Card>
      
      {/* <Typography 
        variant="h4"
      > 
        who is this guy?
      </Typography> */}

      <Typography
       variant="subtitle1"
       align='left'
      > 
        {description}
      </Typography>
    </div>
  )
}

export default Profile
