import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import Coverflow from 'react-coverflow';
import Button from '@material-ui/core/Button';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';



export class SendDrink extends Component {

  state = {
    activeUsers: [],
    selectedUser: 0
  }


  //*****************************************************************************************************
  //ComponentDidMount()
  //*****************************************************************************************************
  componentDidMount() {

    const barId = localStorage.getItem("active-bar")


    ApiManager.get("bars", barId, "_embed=users")
      .then((activeUsersArr) => {
        this.setState({
          activeUsers: activeUsersArr.users
        })
      })
    ////////// NEED TO FILTER THE ARRAY FOR USERS THAT ARE NOT ME
  }


  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    return (
      <>
        <Coverflow
          width={600}
          height={300}
          displayQuantityOfSide={0.5}
          navigation={false}
          infiniteScroll={true}
          enableHeading={false}
          // active={this.state.active}
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

        <Button variant="contained" color="secondary" onClick={() => {
          console.log("Drink with user:", this.state.selectedUser)
        }}>
          {<LocalBarOutlinedIcon />}
        </Button>

      </>
    )
  }
}

export default SendDrink
