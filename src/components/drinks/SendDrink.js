import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import Coverflow from 'react-coverflow';
import Button from '@material-ui/core/Button';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';



export class SendDrink extends Component {

  state = {
    activeUsers: [],
    buttonDisabled: true,
    barId: 0,
    barName: '',
    userId: 0,
    selectedUser: 0
  }


  //*****************************************************************************************************
  //ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    const barId = localStorage.getItem("active-bar")
    const userId = localStorage.getItem("userId")

    ApiManager.get("bars", barId, "_embed=users")
      .then((activeUsersArr) => {     ////////// NEED TO FILTER THE ARRAY FOR USERS THAT ARE NOT ME
        this.setState({
          activeUsers: activeUsersArr.users,
          barId: barId,
          userId: userId
        })
      })

    ApiManager.get("bars", barId)
    .then((BarInfoArr)=> {
      this.setState({
        barName: BarInfoArr.barName
      })
    })

  }


  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    const isEnabled = this.state.selectedUser !==0

    return (
      <>

      <h3>{this.state.barName}</h3> 

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
            return <img key={activeUser.id} id={activeUser.id} src={activeUser.avatarUrl} alt={activeUser.tagLine} onClick={() => {
              this.setState({
                selectedUser: activeUser.id  // setting the selected user in state
              })
            }} />
          })}


        </Coverflow>

        <Button variant="contained" color="secondary" disabled={!isEnabled} onClick={() => {
          console.log("Drink with user:", this.state.selectedUser)
        }}>
          {<LocalBarOutlinedIcon />}
        </Button>

      </>
    )
  }
}

export default SendDrink
