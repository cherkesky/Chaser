import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
    users: {}
  }
  loggedInUserId() { return parseInt(localStorage.getItem("userId")) }
  //*****************************************************************************************************
  // componentDidMount()
  //*****************************************************************************************************
  componentDidMount() {
    ApiManager.get("users", this.loggedInUserId())
      .then((usersArr) => {
        this.setState(
          {
            users: usersArr
          }
        )
      })
  }

  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************

  render() {
    const { classes } = this.props; // material ui styling dependency

    const profileImageUrl = this.state.users.avatarUrl ? this.state.users.avatarUrl : "noimage.png"
    console.log(this.state)
    return (
      <>
        {
          (this.props.user) // have anyone logged in?
            ? // yes? good. show the nav bar
            <AppBar position="static" style={{ background: 'transparent'}}>
              <Toolbar>
              <div className={classes.root}>
                <Avatar alt="Avatar" src={require(`./../../assets/${profileImageUrl}`)} variant="circle"
                  className={classes.bigAvatar}
                  onClick={() => { window.alert("AVATAR CLICKED") }}
                />
                <img alt="logo" src={require("../../assets/ChaserLogo.png")} width="200px" height="40px" onClick={() => { window.alert("LOGO CLICKED") }}></img> 
                <img alt="gears" src={require("../../assets/gears.svg")} width="20px" height="20px" onClick={() => { window.alert("PREFERENCES CLICKED") }}></img>
              </div>
              </Toolbar>
            </AppBar>
            : null // no? dont show the nav bar
        }
      </>
    )
  }
}
export default withStyles(useStyles)(Navbar)

// export default Navbar
