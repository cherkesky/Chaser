import React, { Component } from 'react'
import Background from '../../assets/bg.png';
import Logo from '../../assets/ChaserLogo.png'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


const styles = {
  parent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    position: 'relative'  
  },

  bg: {
    backgroundImage: `url(${Background})`,
    height: 812,
    width: 375,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    backgroundPosition: "center center",
    backgroundSize: "stretch",
    position: 'fixed'  

  },
  welcomebuttons: {
    marginTop: "auto",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'baseline',
    padding: 30
    
  },
  welcomebutton:{
    height: 50
  }
}

export class Welcome extends Component {
  render() {
    return (
      <div style={styles.parent}>
        <Container id="bg" style={styles.bg} > <br /><br />

          <img src={Logo} alt={"logo"} /> <br /><br />
          <Container id="welcomebuttons" style={styles.welcomebuttons} >

            <Button variant="contained" color="secondary" style={styles.welcomebutton} onClick={() => {
              this.props.history.push("/login")
            }} >
              Login
          </Button>
            <Button variant="contained" color="default" style={styles.welcomebutton} onClick={() => {
              this.props.history.push("/register")
            }}>
              Sign Up
          </Button>

          </Container>

        </Container>

      </div>
    )
  }
}

export default Welcome
