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
          let messagesSentArr = messagesArr.filter(message=> 
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

{        (this.state.messagesSentCounter + this.state.messagesReceivedCounter) === 6 

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
