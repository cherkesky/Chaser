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
    localStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({
      user: this.isAuthenticated(),
      userId: authObj.userId,
    })

    ApiManager.get("users", loggedInUserId())
    .then((usersObj) => {
      this.setState(
        {
          users: usersObj
        }
      )
    })
    
    ApiManager.getAll("drinks", `sentTo=${loggedInUserId()}&status=pending&_expand=user`)
        .then((pendingDrinksArr) => {
          this.setState({
            drinkNotif: pendingDrinksArr.length
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
    this.setState({ 
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

    console.log("      .")
    console.log("     .")
    console.log("  . .")
    console.log("  ...")
    console.log("\\~~~~~/")
    console.log(" \\   /")
    console.log("  \\ /")
    console.log("   V")
    console.log("   |")
    console.log("   |")
    console.log("  ---")



    return (
      <React.Fragment>
        <NavBar user={this.state.user} userId={this.state.userId} users={this.state.users} drinkNotif={this.state.drinkNotif} clearUser={this.clearUser} />
        <ApplicationViews user={this.state.user} setUser={this.setUser} />
      </React.Fragment>
    )
  }
}

export default Chaser
