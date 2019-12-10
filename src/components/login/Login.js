import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <FormControl component="fieldset">
         <FormGroup>
         <TextField
          id="standard-input"
          label="Email"
          type="email"
          autoComplete="current-email"
        /><br />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        /><br />
          <Button variant="contained" color="secondary" onClick={() => {
            window.alert("Logged In")
          }}>
           Login
          </Button>
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

export default Login
