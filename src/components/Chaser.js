import React, { Component } from 'react'
import NavBar from './nav/Navbar'
import ApplicationViews from '../ApplicationViews'


export class Chaser extends Component {
  state = {
    user: false,
    userId: '',
  }

   //check for logged in user in local storage
   isAuthenticated = () => localStorage.getItem("credentials") !== null

   //add entered or unentered user info into localStorage and calls isAuthenticated
   setUser = (authObj) => {
 
     localStorage.setItem(
       "credentials",
       JSON.stringify(authObj)
     )
     this.setState({
       user: this.isAuthenticated(),
       userId: authObj.id,
     })
   }
 
   //handle logout functionality
   clearUser = () => {
     localStorage.removeItem("credentials")
     localStorage.removeItem("userId")
     this.setState({ user: this.isAuthenticated() })
   }
 
   //check for logged in user on rerender
   componentDidMount() {
     this.setState({
       user: this.isAuthenticated()
     })
   }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} userId={this.state.userId}/>
        <ApplicationViews user={this.state.user} setUser={this.setUser} />
      </React.Fragment>
    )
  }
}

export default Chaser
