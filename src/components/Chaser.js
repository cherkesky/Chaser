import React, { Component } from 'react'
import ApiManager from "../modules/ApiManager";
import NavBar from './nav/Navbar'
import ApplicationViews from '../ApplicationViews'

//*****************************************************************************************************
  // Get Current User ID
  //*****************************************************************************************************
  const loggedInUserId=() => { return parseInt(localStorage.getItem("userId")) }

export class Chaser extends Component {
  state = {
    user: false,
    users: [],
    userId: 0,
    drinkNotif: 0
  }

  //check for logged in user in local storage
  isAuthenticated = () => localStorage.getItem("credentials") !== null


  //*****************************************************************************************************
  // Set User
  //*****************************************************************************************************

  setUser = (authObj) => {
    console.log("AUTHOBJ", authObj)
    localStorage.setItem(   // set credentials in local storage 
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({   
      user: this.isAuthenticated(),  // set user in in state
      userId: authObj.userId,
    })

    ApiManager.get("users", loggedInUserId())   // fetch current user
    .then((usersObj) => {
      this.setState(
        {
          users: usersObj  // set user array in state
        }
      )
    })
    
    ApiManager.getAll("drinks", `sentTo=${loggedInUserId()}&status=pending&_expand=user`)
        .then((pendingDrinksArr) => {   // fetch pending drinks
          this.setState({
            drinkNotif: pendingDrinksArr.length  // the lenght of the array is the number of the notif
          })
        })
  }

  //*****************************************************************************************************
  // Clear User
  //*****************************************************************************************************
  
  clearUser = () => {
    localStorage.removeItem("credentials") //handle logout functionality
    localStorage.removeItem("userId")
    localStorage.removeItem("active-bar")
    localStorage.removeItem("active-chat")
    this.setState({  // resetting the state
      user: this.isAuthenticated(),
      users: [],
      drinkNotif:0,
      userId: 0
    })
  }

  //*****************************************************************************************************
  // componentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    this.setState({
      user: this.isAuthenticated()    //check for logged in user

    })

  } // componentDidMount() closer


  render() {

    console.log("%c      .", 'background: #222; color: #EF1CEF');
    console.log('%c     .', 'background: #222; color: #EF1CEF')
    console.log("%c  . .", 'background: #222; color: #EF1CEF')
    console.log("%c  ...", 'background: #222; color: #EF1CEF');
    console.log("%c\\~~~~~/", 'background: #222; color: #EF1CEF');
    console.log("%c \\   /", 'background: #222; color: #EF1CEF');
    console.log("%c  \\ /", 'background: #222; color: #EF1CEF');
    console.log("%c   V", 'background: #222; color: #EF1CEF');
    console.log("%c   |", 'background: #222; color: #EF1CEF');
    console.log("%c   |", 'background: #222; color: #EF1CEF');
    console.log("%c  ---", 'background: #222; color: #EF1CEF');
    console.log("%c     ", 'background: #222; color: #EF1CEF');


    return (
      <React.Fragment>
        <NavBar user={this.state.user} userId={this.state.userId} users={this.state.users} drinkNotif={this.state.drinkNotif} clearUser={this.clearUser} />
        <ApplicationViews user={this.state.user} setUser={this.setUser} />
      </React.Fragment>
    )
  }
}

export default Chaser
