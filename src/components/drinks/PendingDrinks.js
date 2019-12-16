import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import Button from '@material-ui/core/Button';
import Coverflow from 'react-coverflow';
import Container from '@material-ui/core/Container';

export class PendingDrinks extends Component {
  
  state = {
    pendingDrinks: [],
    selectedUser: 0,
    selectedDrinkRequest: 0,
    currentResponse: 'pending'
  }
  //*****************************************************************************************************
  // Rerenderer
  //*****************************************************************************************************
  rerenderer = () => {

    const sentFrom = localStorage.getItem("userId")

    console.log("RERENDERER")

    ApiManager.getAll("drinks", `sentTo=${sentFrom}&status=pending&_expand=user`)
          .then((pendingDrinksArr) => {
        // console.log("pendingDrinksArr:", pendingDrinksArr)
        this.setState({
          pendingDrinks: pendingDrinksArr
        })
      })
  }

  //*****************************************************************************************************
  // Get Current User ID
  //*****************************************************************************************************
  loggedInUserId() { return parseInt(localStorage.getItem("userId")) }

  //*****************************************************************************************************
  // Handle Reject
  //*****************************************************************************************************
  handleReject() {
    const userId = this.loggedInUserId()
    let drinkToReject = {}

    ApiManager.getAll("drinks", `userId=${this.state.selectedUser}&sentTo=${userId}&status=pending`)
      .then((drinkRequestArr) => {  // fetch the relevant drink to reject and set it in state
        this.setState({
          selectedDrinkRequest: drinkRequestArr[0].id
        })
      })
      .then(() => {
        drinkToReject = {
          id: this.state.selectedDrinkRequest,  // prepare the object for the PATCH call
          status: "rejected"
        }
        ApiManager.update("drinks", drinkToReject)  // PATCH
      })
      .then(()=>{
        setTimeout(()=>{ this.rerenderer() }, 100); // refresh the screen
      })
      .then(() => {
        this.setState({
          selectedDrinkRequest: 0  // reset the state
        })
      })
  }
  //*****************************************************************************************************
  // Handle Accept
  //*****************************************************************************************************
  handleAccept() {
    const userId = this.loggedInUserId()
    let drinkToAccept = {}
    let setChatUserA = {}
    let setChatUserB = {}

    ApiManager.getAll("drinks", `userId=${this.state.selectedUser}&sentTo=${userId}&status=pending`)
      .then((drinkRequestArr) => {  // fetch the relevant drink to reject and set it in state
        this.setState({
          selectedDrinkRequest: drinkRequestArr[0].id
        })
      })
      .then(() => {
        drinkToAccept = {
          id: this.state.selectedDrinkRequest,  // prepare the object for the PATCH call
          status: "accepted"
        }
        ApiManager.update("drinks", drinkToAccept)  // PATCH
      })
      .then(()=>{
        setChatUserA = {   // updating the approved drinkId with the loggedin user
          id: userId,
          drinkId: this.state.selectedDrinkRequest
        }
        ApiManager.update("users", setChatUserA) // PATCH
      })
      .then(()=>{
        setChatUserB = {
          id: this.state.selectedUser, // updating the approved drinkId with the user that sent the drink
          drinkId:  this.state.selectedDrinkRequest
        }
        ApiManager.update("users", setChatUserB) // PATCH
      })
      .then(()=>{
        setTimeout(()=>{ this.rerenderer() }, 100); // refresh the screen
      })
      .then(() => {
        localStorage.setItem(
          "active-chat",
          JSON.stringify(this.state.selectedDrinkRequest)
        )
        this.setState({
          selectedDrinkRequest: 0  // reset the state
        })
      })
      .then(()=>{
        this.props.history.push("/chat")
      })
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

    const isEnabled = this.state.selectedUser !== 0

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
            this.handleAccept()
          }} >
            Accept
          </Button>
          <Button variant="contained" color="default" disabled={!isEnabled} onClick={() => {
            this.handleReject()
          }}>
            Reject
          </Button>
        </Container>
      </div>
    )
  }
}

export default PendingDrinks
