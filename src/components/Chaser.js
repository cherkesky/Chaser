import React, { Component } from 'react'
import NavBar from './nav/Navbar'
import ApplicationViews from '../ApplicationViews'


export class Chaser extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <ApplicationViews/>
      </React.Fragment>
    )
  }
}

export default Chaser
