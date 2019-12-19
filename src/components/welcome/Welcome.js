import React, { Component } from 'react'
import Background from '../../assets/bg.png';
import Logo from '../../assets/ChaserLogo.png'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const styles = {
  Container: {
      backgroundImage: `url(${Background})`,
      height: 812,
      width: 375,
      margin: 0,
      padding:10,
      backgroundPosition: "center center",
      backgroundSize: "auto"
      
  }
}

export class Welcome extends Component {
  render() {
    return (
      <div>
        <Container id="Container" style={ styles.Container } >
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
