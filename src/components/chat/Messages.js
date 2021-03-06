import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
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
  state = {
    currentUserAvatar: '',
  }

 //*****************************************************************************************************
 // componentDidMount()
 //*****************************************************************************************************
  componentDidMount(){

    const userId = this.props.message.userId // getting the current user from props

    let currentUser = {}  // initialiing the variable
  
    ApiManager.get("users", userId )  // getting the current user object
    .then((res)=>{
      currentUser = res
      this.setState({
        currentUserAvatar: currentUser.avatarUrl // setting the avatar in state
      })
    })
  }
//*****************************************************************************************************
 // render()
 //*****************************************************************************************************
  render() {
    const { classes } = this.props; // material ui styling dependency
    return (
      <div>
        <Paper >
          <Avatar alt="Avatar" src={(this.state.currentUserAvatar)} variant="circle" // Show avatar 
            className={classes.smallAvatar} />
          <Typography variant="h4" gutterBottom > 
          {/* show message */}
            {this.props.message.message}  
         </Typography>
        </Paper>
      </div>
    )
  }
}
export default (withStyles(useStyles)(Messages))
// export default Messages
