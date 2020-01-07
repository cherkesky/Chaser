import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import { createDateTimeToISO } from '../../modules/DateTime'
import Coverflow from 'react-coverflow';
import Button from '@material-ui/core/Button';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';
import alertify from 'alertifyjs';

const styles = {
  parent: {
    height: 732,
    width: 375,
    marginTop: "auto",
    background: "lightgray",
    display: "flex",
    flexDirection: "column",
    position: 'relative'
  },
  buttons: {
    height: 50,
    marginTop: "auto",
    display: 'flex',
    flexDirection: 'column',
  },
  headline: {
    textAlign: 'center'
  }

}


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
  // Abandoned Chat Finder
  //*****************************************************************************************************
  abandonedChatFinder() {
    const userId = sessionStorage.getItem("userId")
    // check if there is an active chat that skipped local storage
    ApiManager.getAll("users", `id=${userId}&activeChat=true`) // checking for an active chat
      .then((activeUsersArr) => {
        if (activeUsersArr.length !== 0) {  // there is an active chat going on
          ApiManager.getAll("drinks", `userId=${userId}&status=accepted`)
            .then((activeChatApprovedByMeArr) => { // abandoned chat found! Get the relevant drinkId
              if (activeChatApprovedByMeArr.length !== 0) {
                console.log("activeChatApprovedByMeArr", activeChatApprovedByMeArr)
                sessionStorage.setItem( // set the chat id in session storage
                  "active-chat",
                  JSON.stringify(activeChatApprovedByMeArr[0].id)
                )
              } else {
                ApiManager.getAll("drinks", `sentTo=${userId}&status=accepted`) // someone approved my drink!
                  .then((activeChatApprovedByOtherArr) => {
                    console.log("activeChatApprovedByOtherArr", activeChatApprovedByOtherArr)
                    sessionStorage.setItem( // set the chat id in session storage
                      "active-chat",
                      JSON.stringify(activeChatApprovedByOtherArr[0].id)
                    )
                  })
              }
            })
        } // parent if closer
      })
  }

  //*****************************************************************************************************
  // Send Drink
  //*****************************************************************************************************
  sendDrink() {
    this.abandonedChatFinder()
    
    if (sessionStorage.getItem("active-chat") === null) // checking if there is no active chat first
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
            alertify.set('notifier', 'position', 'top-center');
            alertify.notify('You already sent this user a drink', 'error', 5, () => { console.log('stop harrasing that user'); });
          }
        })

    } else {
      alertify.set('notifier', 'position', 'top-center');
      alertify.notify('WAIT! SOMEONE APPROVED YOUR DRINK!', 'success', 5,
        () => { this.props.history.push("/chat"); }); // hijacking the user to Chat if there is chat
    }
  }

  //*****************************************************************************************************
  //ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    const barId = sessionStorage.getItem("active-bar")
    const userId = sessionStorage.getItem("userId")

    // set the right gender the user interested in state
    ApiManager.get("users", `${userId}`)
      .then((userArr) => {
        this.setState({
          genderInterested: userArr.genderInterested
        })
      })

    // check if there is an active chat that skipped local storage
    ApiManager.getAll("users", `id=${userId}&activeChat=true`) // checking for an active chat
      .then((activeUsersArr) => {
        if (activeUsersArr.length !== 0) {  // there is an active chat going on
          ApiManager.getAll("drinks", `userId=${userId}&status=accepted`)
            .then((activeChatApprovedByMeArr) => { // abandoned chat found! Get the relevant drinkId
              if (activeChatApprovedByMeArr.length !== 0) {
                console.log("activeChatApprovedByMeArr", activeChatApprovedByMeArr)
                sessionStorage.setItem( // set the chat id in session storage
                  "active-chat",
                  JSON.stringify(activeChatApprovedByMeArr[0].id)
                )
              } else {
                ApiManager.getAll("drinks", `sentTo=${userId}&status=accepted`) // someone approved my drink!
                  .then((activeChatApprovedByOtherArr) => {
                    console.log("activeChatApprovedByOtherArr", activeChatApprovedByOtherArr)
                    sessionStorage.setItem( // set the chat id in session storage
                      "active-chat",
                      JSON.stringify(activeChatApprovedByOtherArr[0].id)
                    )
                  })
              }
            })
        } // parent if closer
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

        let usersFromMyFavGender = usersThatArentMe.filter((user) =>
          user.gender === this.state.genderInterested) // excluding the gender the user not interested in 

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
        <div id="parent" style={styles.parent}>
          <div id="headline" style={styles.headline}>
            <h3>{this.state.barName}</h3>
          </div>
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

          <Button variant="contained" color="secondary" disabled={!isEnabled}
            style={styles.buttons}
            onClick={() => {
              this.sendDrink()
            }}>
            {<LocalBarOutlinedIcon />}
          </Button>
        </div>
      </>
    )
  }
}

export default SendDrink
