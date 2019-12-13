import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import apikeys from '../../apikeys'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class CheckIn extends Component {

  state = {
    xCord: '',
    yCord: '',
    bars: []
  }

  displayLocationInfo = (position) => {
    this.setState({
      xCord: position.coords.latitude,
      yCord: position.coords.longitude
    })
    console.log(`longitude: ${this.state.yCord} | latitude: ${this.state.xCord}`);
    console.log("yCord:" , this.state.yCord, ".is a", typeof this.state.yCord)
    console.log("xCord:" , this.state.xCord, ".is a", typeof this.state.xCord)

    ApiManager.getBars(this.state.xCord, this.state.yCord)
      .then((bars) => {
        this.setState({ bars: bars.results })
        console.log(bars.results)
      })
  }

  //*****************************************************************************************************
  // ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

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
        <Map 
        google={this.props.google} 
        center={{
          lat: this.state.xCord,
          lng: this.state.yCord
        }}
        zoom={18}
        >
        </Map>
        
        <FormControl component="fieldset">
          <FormGroup>

            <Button variant="contained" color="secondary" onClick={() => {

              window.alert("CHECK IN")
            }
              //this.handleCheckIn
            }>
              Check In
          </Button>
            <Button variant="contained" color="default" onClick={() => {
              this.props.clearUser()     // log out
              this.props.history.push("/") // go back to main screen
            }
            }>
              Log Out
          </Button>
          </FormGroup>
        </FormControl>

      </div>
    )

  } // render closer
} // component closer

export default GoogleApiWrapper({
  apiKey: (`${apikeys.googleMapsApiKey}`)
})(CheckIn)
//export default CheckIn
