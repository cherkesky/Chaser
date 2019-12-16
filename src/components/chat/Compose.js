import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import { createDateTimeToISO } from '../../modules/DateTime'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Compose extends Component {

  state = {
    composedMessage: '',
    activeChat: [],
    messagesSentCounter: 0,
    messagesReceivedCounter: 0

  }
//*****************************************************************************************************
  // Get Current User ID
  //*****************************************************************************************************
  loggedInUserId() { return parseInt(localStorage.getItem("userId")) }

  //*****************************************************************************************************
  // Handle Field Change
  //*****************************************************************************************************
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  };
  //*****************************************************************************************************
  // Handle Send
  //*****************************************************************************************************
  handleSend() {
    const currentUserId = this.loggedInUserId()

    const newMessage = {
      userId: currentUserId,
      drinkId: this.state.activeChat.id,
      message: this.state.composedMessage,
      sent: createDateTimeToISO()
    }
    console.log(newMessage)

    ApiManager.post("messages",newMessage)
    .then(this.props.history.push("/chat"))
  }
  //*****************************************************************************************************
  // componentDidMount()
  //*****************************************************************************************************
    componentDidMount(){
      let activeChatId= parseInt(localStorage.getItem("active-chat"))
      ApiManager.get("drinks", `${activeChatId}`)
      .then((res)=>{
        this.setState({
          activeChat: res
        })
      })
    }

  //*****************************************************************************************************
  // render()
  //*****************************************************************************************************
  render() {

    return (
      <>
        <hr />
        <div>
          <p>Message: x of 3</p>
        </div>
        <TextField
          id="composedMessage"
          label=""
          multiline
          rows="16"
          defaultValue=""
          margin="normal"
          variant="outlined"
          fullWidth
          // style={{'font-size': '72px'}}
          onChange={this.handleFieldChange}
        />
        <hr />
        <Button variant="contained" color="secondary" onClick={() => {
          this.handleSend()
        }}>
          Send
          </Button>

      </>
    )
  }
}

export default Compose
