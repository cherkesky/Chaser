import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Pic from "../../assets/user1.png"

const useStyles = theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
    });

export class Navbar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        {
           (this.props.user) 
           ? <div className={classes.root}>
           <Avatar alt="Avatar" src={Pic}
            className={classes.bigAvatar} />
         </div>
           : null
        }
      </>
    )
  }
}
export default withStyles(useStyles)(Navbar)

// export default Navbar
