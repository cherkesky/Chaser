import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export class Messages extends Component {
  render() {
    return (
      <div>
        <Paper >
          <Typography variant="h5" component="h3">
            Message
          </Typography>
          <Typography component="p">
            {this.props.message.message}
         </Typography>
        </Paper>
      </div>
    )
  }
}

export default Messages
