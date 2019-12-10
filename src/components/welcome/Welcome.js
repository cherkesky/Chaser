import React, { Component } from 'react'
import Logo from '../../assets/ChaserLogo.png'
import Button from '@material-ui/core/Button';

export class Welcome extends Component {
  render() {
    return (
      <div>

        <img src={Logo} alt={"logo"} />

        <div>
          <Button variant="contained" color="secondary"onClick={() => {
            this.props.history.push("/login")
          }} >
            Login
          </Button>
          <Button variant="contained" color="default"onClick={() => {
            this.props.history.push("/register")
          }}>
           Sign Up
          </Button>
        </div>


      </div>
    )
  }
}

export default Welcome
