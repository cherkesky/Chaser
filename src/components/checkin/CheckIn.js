import React, { Component } from 'react'

export class CheckIn extends Component {
  //*****************************************************************************************************
  // ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount(){
    const getLocationX=()=> {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((showPositionX));
      } else { 
        console.log ("Geolocation is not supported by this browser.")
      }
    }
    function showPositionX(position) {
      console.log("Latitude: ", position.coords.latitude) 
    }
    const getLocationY=()=> {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((showPositionY));
      } else { 
        console.log ("Geolocation is not supported by this browser.")
      }
    }
    function showPositionY(position) {
      console.log("Longitude: ", position.coords.longitude) 
    }

    getLocationX()
    getLocationY()
  }





  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    return (
      <div>
                <img alt="checkin" src={require("../../assets/checkin.png")}width="400px" height="650px"></img>
      </div>
    )
  }
}

export default CheckIn
