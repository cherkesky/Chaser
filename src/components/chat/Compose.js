import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import { createDateTimeToISO } from '../../modules/DateTime'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {
  parent: {
    height: 732,
    width: 375,
    marginTop: "auto",
    background: "lightgray",
    display: "flex",
    flexDirection: "column",
  },

  button: {
    marginTop: "auto",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'baseline',
    padding: 50,
    height: 50
  }
}

export class Compose extends Component {

  state = {
    composedMessage: '',
    messagesSentCounter: 0,
    activeChat: []
  }
//*****************************************************************************************************
  // Get Current User ID
  //*****************************************************************************************************
  loggedInUserId() { return parseInt(sessionStorage.getItem("userId")) }

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
      let activeChatId= parseInt(sessionStorage.getItem("active-chat"))
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
      <div style={styles.parent}>
        <hr />
        <div >
          <p>Message: {this.props.history.location.state.messagesSentCounter+1} of 3</p>
        </div>
        <TextField 
          id="composedMessage"
          label=""
          multiline
          rows="3"
          defaultValue=""
          margin="normal"
          variant="outlined"
          fullWidth
          InputProps={{ style: { fontSize: 100 } }}
          onChange={this.handleFieldChange}
        />
        <hr />
        

        <Button variant="contained" color="secondary" onClick={() => {
          this.handleSend()
        }}>
          Send
          </Button>
          </div>
      </>
    )
  }
}

export default Compose
