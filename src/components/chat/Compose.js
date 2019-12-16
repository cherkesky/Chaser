import React, { Component } from 'react'
//import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//   },
//   dense: {
//     marginTop: 16,
//   },
//   menu: {
//     width: 200,
//   },
// });

export class Compose extends Component {
  /// state: messagesSent , messagesRecieved



  render() {
    //const { classes } = this.props;

    return (
      <>
        <hr />
        <div>
          <p>Message: x of 3</p>
        </div>
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          rows="10"
          defaultValue=""
          // className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <hr />
        <Button variant="contained" color="secondary" onClick={() => {
          window.alert("Sent")
        }}>
          Send
          </Button>

      </>
    )
  }
}

export default Compose
