import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import Coverflow from 'react-coverflow';
import Countdown from 'react-countdown-now';
import Button from '@material-ui/core/Button';
import alertify from 'alertifyjs';

const styles = {
  parent: {
    height: 732,
    width: 375,
    marginTop: "auto",
    background: "lightgray",
    display: "flex",
    flexDirection: "column",
    position: 'relative',
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


//*****************************************************************************************************
// Render Time
//*****************************************************************************************************
const renderer = ({ minutes, seconds }) => {

  return <span>{minutes}:{seconds}</span>;
}

export class Timeout extends Component {
  state = {
    activeUsers: [],
    buttonDisabled: true,
  }

  //*****************************************************************************************************
  //noTimeoutAlert()
  //*****************************************************************************************************
  noTimeoutAlert = () => {
    alertify.set('notifier', 'position', 'top-center');
    alertify.notify('Timeout is over. Drink Responsibly!', 'success', 5,
      () => { this.props.history.push("/senddrinks"); }); // hijacking the user to Chat if there is chat

  }
  //*****************************************************************************************************
  //ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    const barId = sessionStorage.getItem("active-bar")
    const userId = sessionStorage.getItem("userId")

    ApiManager.get("bars", barId, `_embed=users`)    // get all the users that are checked in
      .then((activeUsersArr) => {
        console.log("activeUsersArr", activeUsersArr)
        this.setState({
          activeUsers: activeUsersArr.users,
          barId: barId,
          userId: userId
        })
      })
      .then(() => {
        let usersThatArentMe = this.state.activeUsers    // exclude the logged im user from the array
        usersThatArentMe = usersThatArentMe.filter((user) =>
          user.id !== parseInt(this.state.userId))
        this.setState({
          activeUsers: usersThatArentMe  // setting the state accordinglly
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
    const isEnabled = !this.state.buttonDisabled

    return (
      <div style={styles.parent}>
        <h3 style={styles.headline}>Enjoy Your Drink</h3>

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
            return <img key={activeUser.id}
              id={activeUser.id}
              src={"https://res.cloudinary.com/datyxctgm/image/upload/v1576634091/avatars/jeptcdonjkhja5u3qndh.png"}
              alt={activeUser.tagLine}
              onClick={() => {
                this.setState({
                  selectedUser: activeUser.id  // setting the selected user in state
                })
              }} />
          })}

        </Coverflow>


          {this.state.buttonDisabled // checking if the button is still disables (countdown is active)
          ?  <Button variant="contained" color="secondary" disabled={!isEnabled}   // countdown button
          style={styles.buttons}
          onClick={() => {
            this.props.history.push("/senddrinks")     // routing back to the drinks view
          }}>
          Timed Out Ends In:
          <Countdown
            // date={Date.now() + 1800000}  // 30min timeout
            date={Date.now() + 10000}
            renderer={renderer}
            onComplete={() => {
              this.setState({
                buttonDisabled: false
              })
              this.noTimeoutAlert()
            }}
          >
          </Countdown>
        </Button>

          : <Button variant="contained" color="secondary" disabled={!isEnabled} // goback button
          style={styles.buttons}
          onClick={() => {
            this.props.history.push("/senddrinks")     // routing back to the drinks view
          }}>
            Go Back
        </Button>
  }


      </div>
    )
  }
}

export default Timeout
