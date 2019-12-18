import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// import ApiManager from '../../modules/ApiManager';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';

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
  

  //*****************************************************************************************************
  // Get Current User ID
  //*****************************************************************************************************
  loggedInUserId() { return parseInt(localStorage.getItem("userId")) }


  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    const profileImageUrl = this.props.users.avatarUrl 

  //   ? this.state.users.avatarUrl
  //  : "https://res.cloudinary.com/datyxctgm/image/upload/v1576165373/avatars/ofnmyyqseai0ho13jo4s.png" // noimage avatar


    const { classes } = this.props; // material ui styling dependency

    // console.log(this.state)    // <------------------------ run 3 times onload???
    return (
      <>
        {
          (this.props.user) // have anyone logged in?
            ? // yes? good. show the nav bar
            <AppBar position="static" style={{ background: 'transparent' }}>
              <Toolbar>
                <div className={classes.root}>
                  {/* Avatar */}
                  <Badge className={classes.margin} badgeContent={this.props.drinkNotif} color="secondary">
                    <Avatar alt="Avatar" src={(profileImageUrl)} variant="circle" // Show avatar with notif
                      className={classes.bigAvatar}
                      onClick={() => { 
                        (this.props.drinkNotif===0) ? window.alert("No pending drinks") : this.props.history.push("/pendingdrinks") }}
                    /></Badge>
                  {/* Logo */}
                  <img alt="logo" src={require("../../assets/ChaserLogo.png")} width="200px" height="40px" onClick={() => { this.props.history.push("/checkin") }}></img>  
                  {/* Preferences */}      
                  <img alt="gears" src={require("../../assets/gears.png")} width="20px" height="20px" onClick={() => { this.props.history.push("/editprofile") }}></img>
                   {/* logout */}     
                  <img alt="logout" src={require("../../assets/logout.png")} width="20px" height="20px" onClick={() => { 
                     this.props.clearUser()     // log out
                     this.props.history.push("/") // go back to main screen
                  }}></img>
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

// export default Navbar
