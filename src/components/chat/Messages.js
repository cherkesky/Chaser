import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  smallAvatar: {
    width: 30,
    height: 30,
  },
})

export class Messages extends Component {

//   state ={
//     UserA: '',
//     UserB: ''
//   }


// componentDidMount(){

// }

  render() {
    const { classes } = this.props; // material ui styling dependency

    return (
      <div>
        <Paper >
          <Typography variant="h5" component="h3">
          <Avatar alt="Avatar" src={("../../assets/gears.png")} variant="circle" // Show avatar with notif
                      className={classes.smallAvatar} />
          </Typography>
          <Typography component="p">
            {this.props.message.message}
         </Typography>
        </Paper>
      </div>
    )
  }
}
export default (withStyles(useStyles)(Messages))
// export default Messages
