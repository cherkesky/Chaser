import React, { Component } from 'react'
import Logo from '../../assets/ChaserLogo.png'

export class Welcome extends Component {
  render() {
    return (
      <div>

        <img src={Logo} alt={"logo"}/>  

        <div>
        <button type="button" id="login" >Login</button>
        <button type="button" id="signup" >Sign Up</button><br/>
        </div>
        

      </div>
    )
  }
}

export default Welcome
