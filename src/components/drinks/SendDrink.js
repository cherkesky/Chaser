import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import Coverflow from 'react-coverflow';
import Button from '@material-ui/core/Button';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';



export class SendDrink extends Component {
 
  state = {
    activeUsers: []
  }

 
//*****************************************************************************************************
//ComponentDidMount()
//*****************************************************************************************************
componentDidMount(){
  
    const barId = localStorage.getItem("active-bar")
  

    ApiManager.get("bars",barId,"_embed=users")
    .then((activeUsersArr)=>{
      this.setState({
        activeUsers: activeUsersArr.users
          })


      console.log(activeUsersArr)
    })

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
          navigation = {false}
          infiniteScroll = {true}
          enableHeading={false}
         // active={this.state.active}
          clickable ={true}
        >
            {this.state.activeUsers.map((activeUser) => { // populating the images
            console.log(activeUser)
                return <img key={activeUser.id} id={activeUser.id} src={activeUser.avatarUrl} alt={activeUser.tagLine} onClick={()=>{
                  console.log("Selected User", activeUser.id)
                }}/>  
              })} 

      
        </Coverflow>

        <Button variant="contained" color="secondary" startIcon={<LocalBarOutlinedIcon/>} onClick={()=>{
          console.log("DRINK!!!!")
                }
          }>
            Drink
          </Button>

      </>
    )
  }
}

export default SendDrink
