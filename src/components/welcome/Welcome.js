import React, { Component } from 'react'
import Register from "../register/Register"
import Logo from '../../assets/ChaserLogo.png'

export class Welcome extends Component {
  render() {
    return (
      <div>

        <img src={Logo} alt={"logo"}/>  

        <div>
        <button type="button" id="login" onClick={()=>{
         this.props.history.push("/login")
          }}>Login</button>
        <button type="button" id="signup" onClick={()=>{
         this.props.history.push("/register")
          }} >Sign Up</button><br/>
        </div>
        

      </div>
    )
  }
}

export default Welcome
