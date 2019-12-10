import React, { Component } from 'react'
import Logo from '../../assets/ChaserLogo.png'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


export class Welcome extends Component {
  render() {
    return (
      <div>
        <Container>
        <img src={Logo} alt={"logo"} /> <br /><br />

          <Button variant="contained" color="secondary"onClick={() => {
            this.props.history.push("/login")
          }} >
            Login
          </Button>
          <Button variant="contained" color="default" onClick={() => {
            this.props.history.push("/register")
          }}>
           Sign Up
          </Button>
          </Container>

      </div>
    )
  }
}

export default Welcome
