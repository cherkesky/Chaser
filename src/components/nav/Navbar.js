import React, { Component } from 'react'
import { withRouter} from "react-router-dom"
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
      .then((usersObj) => {
        this.setState(
          {
            users: usersObj
          }
        )
      })
  }

  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************

  render() {
    const { classes } = this.props; // material ui styling dependency

    const profileImageUrl = this.state.users.avatarUrl ? this.state.users.avatarUrl : "https://res.cloudinary.com/datyxctgm/image/upload/v1576165373/avatars/ofnmyyqseai0ho13jo4s.png" // noimage avatar
    console.log(this.state)    // <------------------------ run 3 times onload???
    return (
      <>
        {
          (this.props.user) // have anyone logged in?
            ? // yes? good. show the nav bar
            <AppBar position="static" style={{ background: 'transparent'}}>
              <Toolbar>
              <div className={classes.root}>
                <Avatar alt="Avatar" src={(profileImageUrl)} variant="circle" 
                  className={classes.bigAvatar}
                  onClick={() => { window.alert("No pending drinks") }}
                />
                <img alt="logo" src={require("../../assets/ChaserLogo.png")} width="200px" height="40px" onClick={() => { this.props.history.push("/checkin")}}></img> 
                <img alt="gears" src={require("../../assets/gears.svg")} width="20px" height="20px" onClick={() => { this.props.history.push("/editprofile") }}></img>
              </div>
              </Toolbar>
            </AppBar>
            : null // no? dont show the nav bar
        }
      </>
    )
  }
}
export default withRouter (withStyles(useStyles)(Navbar))

// export default Navbar
