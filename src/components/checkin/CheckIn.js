import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import apikeys from '../../apikeys'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



 const styles = {
  parent: {
    height: 812,
    width: 375,
    marginTop: "auto",
    background: "lightgray",
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    position: 'relative',
    justifyContent: 'center'  
  },
  buttonsgroup: {
    marginTop: "auto",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'baseline',
    padding: 30,
    backgroundColor: "#F6F4F6",
    opacity: 0.9,
    boxShadow: 1
    
  },
  buttons: {
    height: 50
  }
  
}



export class CheckIn extends Component {
  
  state = {
    xCord: '',
    yCord: '',
    selectedBar: '',
    activeBar: 0,
    buttonDisabled: true,
    bars: []
  }

  
  
  //*****************************************************************************************************
  // Get Current User ID
  //*****************************************************************************************************
  loggedInUserId() { return parseInt(sessionStorage.getItem("userId")) }
  
  //*****************************************************************************************************
  // Get Current Checked In Active Bar 
  //*****************************************************************************************************
  checkedInBar() { 
      if (isNaN(parseInt(sessionStorage.getItem("active-bar")))){ // no active bars in local storage
        return 0
      } else{
        return parseInt(sessionStorage.getItem("active-bar")) // there is an active bar
      }
}
  
  //*****************************************************************************************************
  // Handle Checkout
  //*****************************************************************************************************
  handleCheckOut = () => {
    sessionStorage.removeItem("active-bar")
    this.setState({
      activeBar: 0
    })

    let whatUser = this.loggedInUserId()
    
      const checkOutObj = {
        id: whatUser,
        barId: 0
      } 
      ApiManager.update("users", checkOutObj)


  }
  //*****************************************************************************************************
  // Handle Check In
  //*****************************************************************************************************
      
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
  // Create New Bar (If doesn't exists in the database)
  //*****************************************************************************************************
  createBar = () => {
    console.log("New Bar Created")
    
    
    let filteredBar = this.state.bars.filter(bar=>   // filtering the bars to get only the selected one
      bar.place_id === this.state.selectedBar)
    
      const newBar = {  // creating a new object 
        apiPlaceId: filteredBar[0].place_id,
        openNow: filteredBar[0].opening_hours.open_now,
        barName: filteredBar[0].name,
        barAddress:filteredBar[0].vicinity,
        chaserCoinCredit: 0
      }

      ApiManager.post("bars", newBar) // POSTing that object to the database
      .then(()=>this.checkInUser())  // and now lets check in 
  }
 //*****************************************************************************************************
  // Check The User In To The selected Bar
  //*****************************************************************************************************
  checkInUser = () => {

    ApiManager.getAll("bars",`apiPlaceId=${this.state.selectedBar}`)
    .then((res)=>{
      let toWhatBar = res[0].id
      let whatUser = this.loggedInUserId()
      console.log("checking in user",whatUser,"to bar:", toWhatBar)
      const checkinObj = {
        id: whatUser,
        barId: toWhatBar
      }
      sessionStorage.setItem(
        "active-bar",
        JSON.stringify(checkinObj.barId)
      )
        
      ApiManager.update("users", checkinObj)
      .then(this.props.history.push("/senddrinks"))
      
    })

  }
  //*****************************************************************************************************
  // Handle Bar Dropdown
  //*****************************************************************************************************

  handleBarDropdown = event => {
    this.setState({ selectedBar: event.target.value });
  };
  //*****************************************************************************************************
  // Set Coordinates In State
  //*****************************************************************************************************
  displayLocationInfo = (position) => {
    this.setState({
      xCord: position.coords.latitude,
      yCord: position.coords.longitude
    })
    // console.log(`longitude: ${this.state.yCord} | latitude: ${this.state.xCord}`); // uncomment for testing youre getting the right coordinates
    
    //*****************************************************************************************************
    // Get all the nearby bars (200m) and set them in state
    //*****************************************************************************************************
    ApiManager.getBars(this.state.xCord, this.state.yCord)
      .then((bars) => {
        this.setState({ bars: bars.results })
      })
  }
  //*****************************************************************************************************
  // ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }

    
    this.setState({
      activeBar: this.checkedInBar()
      
    })
  } // componentDidMount closer

  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {

    const isEnabled = this.state.selectedBar !==''
    const isCheckedIn = this.state.activeBar !==0 

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
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <Card style={{"background": "gray"}}> 
          <CardContent>
        <FormControl component="fieldset"  style={styles.buttonsgroup}>   
          <FormGroup> 
          <FormControl variant="filled">
          <Select
              labelId="bar-dropdown-label"
              id="bar-dropdown"
              value={this.state.selectedBar}
              name="bar"
              variant="filled"
              onChange={this.handleBarDropdown}
            >
              {this.state.bars.map((bar) => { // populating the drop down menu
                return <MenuItem key={bar.id} value={bar.place_id}>  
                  {bar.name}
                </MenuItem>
              })}
            </Select>
            </FormControl>

            <Button variant="contained" color="secondary"  disabled={!isEnabled}  
            style={styles.buttons}
              onClick={() => {
              this.handleCheckIn()    // Check in button
            }
            }>
              Check In
          </Button>
            <Button variant="contained" color="default" disabled={!isCheckedIn} 
            style={styles.buttons}
            onClick={() => {
             this.handleCheckOut()   // Check out button
            }
            }>
              Check Out
          </Button>

          </FormGroup>
        </FormControl>
        </CardContent>
        </Card>
      </div>
    )

  } // render closer
} // component closer

export default GoogleApiWrapper({
  apiKey: (`${apikeys.googleMapsApiKey}`)
})(CheckIn)
