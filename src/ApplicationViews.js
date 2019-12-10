import React, { Component } from 'react'
import { Route } from "react-router-dom";
import Welcome from "./components/welcome/Welcome"

export class ApplicationViews extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/" render={props => {
            return <Welcome {...props} />
          }}
        />
      </React.Fragment>
    )
  }
}

export default ApplicationViews
