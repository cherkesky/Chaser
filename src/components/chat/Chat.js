import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import ApiManager from '../../modules/ApiManager';
import Messages from '../chat/Messages'

export class Chat extends Component {

  state = {
    activeChatId: 0,
    activeUserId: 0,
    messagesSentCounter: 0,
    messagesReceivedCounter: 0,
    messages: []
  }

  //*****************************************************************************************************
  // Handle Close
  //*****************************************************************************************************
  handleClose() {

    // the party is over. time to clean up the mess....

    let resetActiveChat = {}
    let setChatCompleted = {}

    setChatCompleted = {
      id: this.state.activeChatId,
      status: "completed"
    }

    ApiManager.update("drinks", setChatCompleted) // PATCH drinks

    resetActiveChat = {   // resetting drinkId for the active user
      id: this.state.activeUserId,
      activeChat: false
    }
    console.log("resetActiveChat", resetActiveChat)
    ApiManager.update("users", resetActiveChat) // PATCH user
     .then(()=>{

      for  (let i=0; i<this.state.messages.length; i++){
        ApiManager.delete("messages", this.state.messages[i].id)// looping and deleting all messages
          console.log('Message ID:', this.state.messages[i].id )}
     })
     .then(()=>{
      localStorage.removeItem("active-chat") // remove chat from local storage
      this.props.history.push("/senddrinks") // go back to the SendDrinks view
     })
     
  }

  //*****************************************************************************************************
  // componentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    this.setState({
      activeChatId: parseInt(localStorage.getItem("active-chat")),
      activeUserId: parseInt(localStorage.getItem("userId"))
    })


    setTimeout(() => {
      ApiManager.getAll("messages", `drinkId=${this.state.activeChatId}&_expand=drink&_sort=sent`)
        .then((messagesArr) => {
          console.log("messagesArr", messagesArr)
          let messagesSentArr = messagesArr.filter(message =>
            message.userId === this.state.activeUserId)
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
        {
          this.state.messages.map(message =>
            <Messages
              key={message.id}
              message={message}
              {...this.props}
            />
          )
        }

        {(this.state.messagesSentCounter + this.state.messagesReceivedCounter) === 6

          ? <Button variant="contained" color="secondary" onClick={() => { // reached 6 messages
            this.handleClose()
          }}>
            Close
  </Button>

          : <Button variant="contained" color="secondary" onClick={() => { // chat is still active
            this.props.history.push("/compose")
          }}>
            Compose
  </Button>
        }
      </>
    )
  }
}

export default Chat
