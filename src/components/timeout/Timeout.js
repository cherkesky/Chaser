import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import Coverflow from 'react-coverflow';
import Button from '@material-ui/core/Button';

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
    const isEnabled = false

    return (
      <div>
          <h1>Timeout</h1>
          <h3>Enjoy Your Drink</h3>

          <Coverflow                // Image carousel initialization
          width={600}
          height={300}
          displayQuantityOfSide={0.5}
          navigation={false}
          infiniteScroll={true}
          enableHeading={false}
          clickable={true}
        >
          {this.state.activeUsers.map((activeUser) => { // populating the images
            return <img key={activeUser.id} id={activeUser.id} src={"https://res.cloudinary.com/datyxctgm/image/upload/v1576634091/avatars/jeptcdonjkhja5u3qndh.png"} alt={activeUser.tagLine} onClick={() => {
              this.setState({
                selectedUser: activeUser.id  // setting the selected user in state
              })
            }} />
          })}


        </Coverflow>

        <Button variant="contained" color="secondary" disabled={!isEnabled} onClick={() => {
          this.sendDrink()
        }}>
          Timeout
        </Button>
      </div>
    )
  }
}

export default Timeout
