import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import alertify from 'alertifyjs';

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

const styles = {
  parent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    position: 'relative'
  },

  navbuttons: {
    marginTop: "auto",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'baseline',
    paddingLeft: '30px'

  }
}

export class Navbar extends Component {


  //*****************************************************************************************************
  // Get Current User ID
  //*****************************************************************************************************
  loggedInUserId() { return parseInt(sessionStorage.getItem("userId")) }


  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    const profileImageUrl = this.props.users.avatarUrl
    const { classes } = this.props; // material ui styling dependency
    alertify.set('notifier', 'position', 'top-center')

    return (
      <>
        {
          (this.props.user) // have anyone logged in?
            ? // yes? good. show the nav bar
            <AppBar position="static" style={{ background: 'transparent' }}>
              <Toolbar id="toolbar" style={styles.parent}>
                <div className={classes.root}>
                  {/* Avatar */}
                  <Badge className={classes.margin} badgeContent={this.props.drinkNotif} color="secondary">
                    <Avatar alt="Avatar" src={(profileImageUrl)} variant="circle" // Show avatar with notif
                      className={classes.bigAvatar}
                      onClick={() => {
                        (this.props.drinkNotif === 0)
                          ? alertify.notify('No pending drinks', 'info', 5,
                          () => { console.log("empty chat") })
                          
                        : this.props.history.push("/pendingdrinks")
                  }}
                    /></Badge>
                  {/* Logo */}
                  <img alt="logo" src={require("../../assets/ChaserLogo.png")} width="200px" height="40px" onClick={() => { this.props.history.push("/checkin") }}></img>
                  <div id="navbuttons" style={styles.navbuttons}>
                    {/* Preferences */}
                    <img alt="gears" src={require("../../assets/gears.png")} width="20px" height="20px" onClick={() => { this.props.history.push("/editprofile") }}></img>
                    {/* logout */}   <br />
                    <img alt="logout" src={require("../../assets/logout.png")} width="20px" height="20px" onClick={() => {
                      this.props.clearUser()     // log out
                      this.props.history.push("/") // go back to main screen
                    }}></img>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
            : null // no one logged in? dont show the nav bar
        }
      </>
    )
  }
}
export default withRouter(withStyles(useStyles)(Navbar))

