import React, { Component } from 'react'
import { Route } from "react-router-dom";
import Welcome from "./components/welcome/Welcome"
import Register from "./components/register/Register"
import Login from "./components/login/Login"


export class ApplicationViews extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/" render={props => {
            return <Welcome {...props} />
          }}
        />

        <Route
          exact path="/register" render={props => {
            return <Register {...props} />
          }}
        />

        <Route
          exact path="/login" render={props => {
            return <Login {...props} />
          }}
        />
      </React.Fragment>

    )
  }
}

export default ApplicationViews