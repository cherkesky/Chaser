import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import Coverflow from 'react-coverflow';
import Countdown from 'react-countdown-now';
import Button from '@material-ui/core/Button';


const renderer = ({minutes, seconds }) => {
  
    return <span>{minutes}:{seconds}</span>;
  }



export class Timeout extends Component {
  state = {
    activeUsers: [],
    buttonDisabled: true,
  }
  //*****************************************************************************************************
  //ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    const barId = localStorage.getItem("active-bar")
    const userId = localStorage.getItem("userId")



    ApiManager.get("bars", barId, `_embed=users`)    // get all the users that are checked in
      .then((activeUsersArr) => {
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
      <div>
        <h3>Enjoy Your Drink</h3>

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

        <Button variant="contained" color="secondary" disabled={!isEnabled} onClick={() => {
          this.props.history.push("/senddrinks")
        }}>
          Timed Out Ends In: 
          <Countdown 
          // date={Date.now() + 1800000}  // 30min
          date={Date.now() + 10000} 
          renderer={renderer}
          onComplete={()=>{
            this.setState({
              buttonDisabled: false
            })
          }}
          >
          </Countdown>
        </Button>
      </div>
    )
  }
}

export default Timeout
