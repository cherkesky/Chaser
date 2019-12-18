import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import { createDateTimeToISO } from '../../modules/DateTime'
import Coverflow from 'react-coverflow';
import Button from '@material-ui/core/Button';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';


export class SendDrink extends Component {

  state = {
    activeUsers: [],
    buttonDisabled: true,
    barId: 0,
    barName: '',
    userId: 0,
    selectedUser: 0,
    genderInterested: ''
  }

  //*****************************************************************************************************
  // Send Drink
  //*****************************************************************************************************

  sendDrink() {

    if (localStorage.getItem("active-chat") === null) // checking if there is no active chat first
    {
      // no active chat 
      ApiManager.getAll("drinks", `sentTo=${this.state.selectedUser}&userId=${this.state.userId}&status=pending`)

        .then((pendingDrinksArr) => {
          console.log("pendingDrinksArr", pendingDrinksArr)
          if (pendingDrinksArr.length === 0) {     // check if there is already a drink request for the user
            console.log("User:", this.state.userId, "sent a drink to:", this.state.selectedUser)

            const newDrinkObj = { // preparing the new drink obj
              userId: parseInt(this.state.userId),
              sentTo: this.state.selectedUser,
              toggleUserA: false,
              toggleUserB: true,
              chatActive: false,
              status: "pending",
              matchTime: createDateTimeToISO()
            }
            ApiManager.post("drinks", newDrinkObj)   // POSTing a new drink entity in the database
          } else {
            window.alert("You already sent this user a drink")
          }
        })

    } else {
      window.alert("SOMEONE APPROVED YOUR DRINK!")
      this.props.history.push("/chat") // hijacking the user to Chat if there is chat
    }
  }

  //*****************************************************************************************************
  //ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    const barId = localStorage.getItem("active-bar")
    const userId = localStorage.getItem("userId")

    // set the right gender the user interested in state
    ApiManager.get("users",`${userId}`)
    .then((userArr)=>{
      this.setState({
        genderInterested: userArr.genderInterested
      })
    })
   
    // check if there is an active chat that skipped local storage
    ApiManager.getAll("users", `id=${userId}&activeChat=true`)
      .then((activeUsersArr) => {
        if (activeUsersArr.length !== 0) {
          ApiManager.getAll("drinks", `userId=${userId}&status=accepted`)
            .then((activeChatsArr) => {
              console.log("activeChatsArr", activeChatsArr)
              localStorage.setItem(
                "active-chat",
                JSON.stringify(activeChatsArr[0].id)
              )
            })
        }
      })

    ApiManager.get("bars", barId, `_embed=users`)    // get all the users that are checked in
      .then((activeUsersArr) => {
        this.setState({
          activeUsers: activeUsersArr.users,
          barId: barId,
          userId: userId
        })
      })
      .then(() => {
        let usersThatArentMe = this.state.activeUsers    // excluding the logged in user from the array
        
        usersThatArentMe = usersThatArentMe.filter((user) =>
          user.id !== parseInt(this.state.userId))
          console.log("usersThatArentMe",usersThatArentMe)

          let usersFromMyFavGender = usersThatArentMe.filter((user) => 
          user.gender === this.state.genderInterested ) // excluding the gender the user not interested in 

          console.log("usersFromMyFavGender",usersFromMyFavGender)

        this.setState({
          activeUsers: usersFromMyFavGender  // setting the state accordinglly
        })

        })

    ApiManager.get("bars", barId)
      .then((BarInfoArr) => {    // get the bar name for the header
        this.setState({
          barName: BarInfoArr.barName
        })
      })
  }

  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    const isEnabled = this.state.selectedUser !== 0

    return (
      <>

        <h3>{this.state.barName}</h3>

        <Coverflow                // Image carousel initialization
          width={600}
          height={300}
          displayQuantityOfSide={0.5}
          navigation={false}
          infiniteScroll={true}
          enableHeading={true}
          clickable={true}
        >
          {this.state.activeUsers.map((activeUser) => { // populating the images
            return <img key={activeUser.id} id={activeUser.id} src={activeUser.avatarUrl} alt={activeUser.tagLine} onClick={() => {
              this.setState({
                selectedUser: activeUser.id  // setting the selected user in state
              })
            }} />
          })}


        </Coverflow>

        <Button variant="contained" color="secondary" disabled={!isEnabled} onClick={() => {
          this.sendDrink()
        }}>
          {<LocalBarOutlinedIcon />}
        </Button>

      </>
    )
  }
}

export default SendDrink
