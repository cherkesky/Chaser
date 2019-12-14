import React, { Component } from 'react'
import Coverflow from 'react-coverflow';
import Button from '@material-ui/core/Button';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';


export class SendDrink extends Component {
  state = {
    userForDrink: ''
  }



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
          active={this.state.active}
          clickable ={true}
        >
          
          <img id="1" src='https://res.cloudinary.com/datyxctgm/image/upload/v1576167916/avatars/zezgggkbsq9gedutqbjr.png' alt='Yolo2' onClick={()=>{console.log("1")}} />
          <img src='https://res.cloudinary.com/datyxctgm/image/upload/v1576207308/avatars/asprq33pq2bjpveymllw.jpg' alt='Yolo3'onClick={()=>{console.log("2")}}  />
          <img src='https://res.cloudinary.com/datyxctgm/image/upload/v1576207308/avatars/asprq33pq2bjpveymllw.jpg' alt='Yolo4' onClick={()=>{console.log("3")}} />

      
        </Coverflow>

        <Button variant="contained" color="secondary" startIcon={<LocalBarOutlinedIcon/>} onClick={
            console.log("DRINK!!!!")
          }>
          </Button>

      </>
    )
  }
}

export default SendDrink
