import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';


export class CheckIn extends Component {
  
  state = {
    xCord: '',
    yCord: '',
    bars: []
  }

   displayLocationInfo=(position)=> {
   this.setState({ 
     xCord: position.coords.latitude,
     yCord: position.coords.longitude
   })
   console.log(`longitude: ${ this.state.yCord } | latitude: ${ this.state.xCord }`);
   ApiManager.getBars(this.state.xCord,this.state.yCord)
   .then((bars)=>{
     this.setState({bars: bars.results})
     console.log(bars.results)
   })
  }
  
  //*****************************************************************************************************
  // ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount(){
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
  } // componentDidMount closer

  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    return (
      <div>
      <img alt="checkin" src={require("../../assets/checkin.png")}width="400px" height="650px"></img>
      </div>
    )
    
  } // render closer
} // component closer

export default CheckIn
