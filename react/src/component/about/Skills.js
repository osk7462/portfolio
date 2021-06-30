import React from 'react'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  bar: {
    height: theme.spacing(4),
    width: "100%",
    background: "silver",
    position: "relative",
    marginBottom: theme.spacing(3),
  },
  fill: {
    height: "100%",
    width: props => `${props.experience}%`,
    background: "#0e7c80",
    position: "absolute",
    top: "0",
    left: "0",
  },
  tag: {
    height: "100%",
    width: theme.spacing(15),
    background: "#22686a",
    position: "absolute",
    left: "0",
    color: "white",
    letterSpacing: theme.spacing(0.2),
    '& span': {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: 'translate(-50%, -50%)',
      // textAlign: "center",
      fontWeight: "bold",
      fontSize: "1rem",
      textTransform: 'capitalize'
    }
  },
  percentage: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    position: "absolute",
    top: "15%",
    right: "1%",
    fontWeight: "400",
    fontSize: "1rem"
  }

}))


function Skills({name, experience}) {
  const props = {experience}
  const classes = useStyles(props)
  return (
      <div className={classes.bar}>
        <div className={classes.fill} >
          <div className={classes.tag}>
            <span>{name}</span></div>
        </div>
        <span className={classes.percentage}>{experience}%</span>
      </div>
  )
}

export default Skills
