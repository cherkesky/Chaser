import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import ApiManager from '../../modules/ApiManager';
import Messages from '../chat/Messages'

export class Chat extends Component {

  state = {
    activeChatId: 0,
    userA: 0,
    userB: 0,
    messages: []
  }

componentDidMount(){
this.setState({
  activeChatId: parseInt(localStorage.getItem("active-chat"))
})

setTimeout(()=>{ 
  ApiManager.getAll("messages",`drinkId=${this.state.activeChatId}&_expand=drink&_sort=sent`)  
  .then((messagesArr)=>{
    this.setState({
      messages: messagesArr
    })
  })
 }, 100) 
} // componentDidMount() closer 


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


          <Button variant="contained" color="secondary" onClick={() => {
            window.alert("Compose")
          }}>
            Compose
          </Button>
      </>
    )
  }
}

export default Chat
