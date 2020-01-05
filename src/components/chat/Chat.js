import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import ApiManager from '../../modules/ApiManager';
import Messages from '../chat/Messages'
import { Container } from '@material-ui/core';
import alertify from 'alertifyjs';


const styles = {
  parent: {
    height: 732,
    width: 375,
    marginTop: "auto",
    background: "lightgray",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-end'
  },
  buttons: {
    marginTop: "auto",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'baseline',
    padding: 30

  },

  button: {
    marginTop: "auto",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'baseline',
    height: 50
  }
}
export class Chat extends Component {

  state = {
    activeChatId: 0,
    activeUserId: 0,
    theOtherUserId: 0,
    messagesSentCounter: 0,
    messagesReceivedCounter: 0,
    messages: []
  }
  //*****************************************************************************************************
  // Rerenderer
  //*****************************************************************************************************

  rerenderer = () => {

    console.log("RERENDERER")
    setTimeout(() => {

    ApiManager.getAll("messages", `drinkId=${this.state.activeChatId}&_expand=drink&_sort=sent`)
    .then((messagesArr) => {
        this.setState({
          messages: messagesArr
        })
      })
    },100) // timeout closer
  }
  //*****************************************************************************************************
  // Handle Close
  //*****************************************************************************************************
  handleClose() {

    // the party is over. time to clean up the mess....

    let resetActiveChatForMe = {}
    let resetActiveChatForOtherUser = {}
    let setChatCompleted = {}

    setChatCompleted = {
      id: this.state.activeChatId,
      status: "completed" }
    ApiManager.update("drinks", setChatCompleted) // PATCH drinks

    resetActiveChatForMe = {   // resetting drinkId for the active user
      id: this.state.activeUserId,
      activeChat: false
    }
    resetActiveChatForOtherUser = {   // resetting drinkId for the other user
      id: this.state.theOtherUserId,
      activeChat: false
    }

    ApiManager.update("users",resetActiveChatForOtherUser) // PATCH the other user
    .then(()=>{
      console.log("the other user ActiveChat has been reset")
    })
    
    ApiManager.update("users", resetActiveChatForMe) // PATCH my user
      .then(() => {

        for (let i = 0; i < this.state.messages.length; i++) {
          ApiManager.delete("messages", this.state.messages[i].id)// looping and deleting all messages
          console.log('Deleting message ID:', this.state.messages[i].id)
        }
      })
      .then(() => {
        sessionStorage.removeItem("active-chat") // remove chat from local storage
        this.props.history.push("/timeout") // sending user to the timeout view
      })

  }

  //*****************************************************************************************************
  // componentDidMount()
  //*****************************************************************************************************
  componentDidMount() {
    window.addEventListener('storage',(e) => {
      this.rerenderer()
      console.log(e)
    })
  
    this.setState({
      activeChatId: parseInt(sessionStorage.getItem("active-chat")),
      activeUserId: parseInt(sessionStorage.getItem("userId"))
    })


    setTimeout(() => {
      ApiManager.getAll("messages", `drinkId=${this.state.activeChatId}&_expand=drink&_sort=sent`)
        .then((messagesArr) => {
          // console.log("The messages thread", messagesArr)   
          let messagesSentArr = messagesArr.filter(message =>
            message.userId === this.state.activeUserId)  // checking how many messeges sent
          if (messagesArr.length === 0) {
            alertify.set('notifier', 'position', 'top-center');
            alertify.notify('Be the first one to compose a message!', 'info', 5,
              () => { console.log("empty chat") });
          } else {
            // console.log("messages found")
            if (this.state.activeUserId === messagesArr[0].drink.sentTo){
              // console.log("Im the one that approved the drink")
              this.setState({
                theOtherUserId: messagesArr[0].drink.userId
              })
            } else {
              // console.log("Im the one that sent the drink")
              this.setState({
                theOtherUserId: messagesArr[0].drink.sentTo
              })
            }
          }
          this.setState({
            messages: messagesArr,
            messagesSentCounter: messagesSentArr.length,
            messagesReceivedCounter: (messagesArr.length - messagesSentArr.length)
          })
        })
    }, 100)
  } // componentDidMount() closer 

  //*****************************************************************************************************
  // render()
  //*****************************************************************************************************
  render() {
    return (
      <>
        <div style={styles.parent}>
          {
            this.state.messages.map(message =>
              <Messages
                key={message.id}
                message={message}
                {...this.props}
              />
            )
          }

          <Container style={styles.buttons}>
            {(this.state.messagesSentCounter + this.state.messagesReceivedCounter) >= 6

              ? <Button variant="contained" color="secondary"
                style={styles.button}
                onClick={() => { // reached 6 messages
                  this.handleClose()
                }}>
                Close
         </Button>

              : <Button variant="contained" color="secondary"
                style={styles.button}
                onClick={() => { // chat is still active
                  this.props.history.push({
                    pathname: '/compose',  // passing the counter as an argument to the history stack
                    state: { messagesSentCounter: this.state.messagesSentCounter }
                  });
                }}>
                Compose
        </Button>
            }
          </Container>
        </div>
      </>
    )
  }
}

export default Chat
