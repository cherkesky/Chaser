import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
  state = {
    users: []
  }

   loggedInUserId() {return parseInt(localStorage.getItem("userId"))}
    getAvatar = ApiManager.get("users", this.loggedInUserId())
     .then((usersArr) => {
        this.setState(
          {
            users: usersArr
          }
        )
      })


  render() {
    const { classes } = this.props;
     return (
      <>
        {
          (this.props.user)
            ? <div className={classes.root}>
              <Avatar alt="Avatar" src={require('../../assets/user1.png')} variant="circle"
                className={classes.bigAvatar}
                onClick={()=> {window.alert("AVATAR CLICKED")}}
                 />
            </div>
            : null
        }
      </>
    )
  }
}
export default withStyles(useStyles)(Navbar)

// export default Navbar
