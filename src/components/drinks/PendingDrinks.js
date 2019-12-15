import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import Button from '@material-ui/core/Button';
import Coverflow from 'react-coverflow';
import Container from '@material-ui/core/Container';

export class PendingDrinks extends Component {
  // getting all the pending drinks from the db
  // http://localhost:5002/drinks?userId=8&status=pending&_expand=user
  // setting the array in pendingDrinks state
  // populate the carousel with the images of who sent the drink


  //*****************************************************************************************************
  // Get Current User ID
  //*****************************************************************************************************
  loggedInUserId() { return parseInt(localStorage.getItem("userId")) }


  state = {
    pendingDrinks: [],
    selectedUser: 0
  }

  //*****************************************************************************************************
  //ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    const sentFrom = localStorage.getItem("userId")

    ApiManager.getAll("drinks", `sentTo=${sentFrom}&status=pending&_expand=user`) // get all pending drinks
      .then((pendingDrinksArr) => {
        this.setState({
          pendingDrinks: pendingDrinksArr
        })
      })

  }
  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    
    const isEnabled = this.state.selectedUser !==0

    return (
      <div>
        <h3>Pending Drink Requests</h3>
        <Container>
          <hr />
        <Coverflow                // Image carousel initialization
          width={600}
          height={300}
          displayQuantityOfSide={0.5}
          navigation={false}
          infiniteScroll={true}
          enableHeading={false}
          clickable={true}
        >
          {this.state.pendingDrinks.map((pendingDrink) => { // populating the images
            return <img key={pendingDrink.user.id} id={pendingDrink.user.id} src={pendingDrink.user.avatarUrl} alt={pendingDrink.user.tagLine} onClick={() => {
              this.setState({
                selectedUser: pendingDrink.user.id  // setting the selected user in state
              })
            }} />
          })}
        </Coverflow>
          <hr />
        </Container>
        <Container>
          <Button variant="contained" color="secondary" disabled={!isEnabled} onClick={() => {
            window.alert("ACCEPT")
          }} >
            Accept
          </Button>
          <Button variant="contained" color="default" disabled={!isEnabled} onClick={() => {
            window.alert("REJECT")
          }}>
            Reject
          </Button>
        </Container>
      </div>
    )
  }
}

export default PendingDrinks
