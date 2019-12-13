import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import apikeys from '../../apikeys'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class CheckIn extends Component {

  state = {
    xCord: '',
    yCord: '',
    selectedBar: '',
    bars: []
  }

  //*****************************************************************************************************
  // Handle Check In
  //*****************************************************************************************************
      // grab places id from the database
      // .getall request to the database to get all the bars ?apiPlaceid=this.state.selectedBar
      // emptyarray => call the createBar function
      // else grab the user id and set the user's barId to whatever that bars.id is

    handleCheckIn = () => {
      let selectedBar = this.state.selectedBar
      ApiManager.getAll("bars",`apiPlaceId=${selectedBar}`)
      .then((barsArr)=>{
        if (barsArr.length>0){
          this.checkInUser()
        }else {
          this.createBar()
        }
      })
    }
  //*****************************************************************************************************
  // Create New Bar (If not exist in the database)
  //*****************************************************************************************************
  createBar = () => {
    console.log("New Bar Created")
    
    
    let filteredBar = this.state.bars.filter(bar=>   // filtering the bars to get only the selected one
      bar.place_id === this.state.selectedBar)

      
      const newBar = {
        apiPlaceId: filteredBar[0].place_id,
        openNow: filteredBar[0].opening_hours.open_now,
        barName: filteredBar[0].name,
        barAddress:filteredBar[0].vicinity,
        chaserCoinCredit: 0
      }

      ApiManager.post("bars", newBar)
      .then(()=>this.checkInUser())
  }
 //*****************************************************************************************************
  // Check The User In To The selected Bar
  //*****************************************************************************************************
  checkInUser = () => {

    console.log("Checked In")

  }
  //*****************************************************************************************************
  // Handle Bar Dropdown
  //*****************************************************************************************************

  handleBarDropdown = event => {
    this.setState({ selectedBar: event.target.value });
  };
  //*****************************************************************************************************
  // Show Map
  //*****************************************************************************************************
  displayLocationInfo = (position) => {
    this.setState({
      xCord: position.coords.latitude,
      yCord: position.coords.longitude
    })
    console.log(`longitude: ${this.state.yCord} | latitude: ${this.state.xCord}`);
    console.log("yCord:", this.state.yCord, ".is a", typeof this.state.yCord)
    console.log("xCord:", this.state.xCord, ".is a", typeof this.state.xCord)
    //*****************************************************************************************************
    // Get all the nearby bars (20m) and set them in state
    //*****************************************************************************************************
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
          google={this.props.google}  // Show map
          center={{
            lat: this.state.xCord, 
            lng: this.state.yCord
          }}
          zoom={18} 
        >
        </Map> 

        <FormControl component="fieldset">
          <FormGroup>
          <FormControl variant="filled">
          <Select
              labelId="bar-dropdown-label"
              id="bar-dropdown"
              value={this.state.selectedBar}
              name="bar"
              onChange={this.handleBarDropdown}
            >
              {this.state.bars.map((bar) => {
                return <MenuItem key={bar.id} value={bar.place_id}>
                  {bar.name}
                </MenuItem>
              })}
            </Select>
            </FormControl>

            <Button variant="contained" color="secondary" onClick={() => {
              this.handleCheckIn()
            }
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
