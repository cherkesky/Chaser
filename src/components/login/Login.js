import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {
  parent: {
    height: 812,
    width: 375,
    marginTop: "auto",
    background: "lightgray",
    display: "flex",
    flexDirection: "column",
    position: 'relative',
    justifyContent: 'center'  
  },
  loginbutton: {
    height: 50
  }
}

export class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  //*****************************************************************************************************
  // Handle File Change
  //*****************************************************************************************************
  handleFieldChange = (e) => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  };
  //*****************************************************************************************************
  // Handle Login
  //*****************************************************************************************************
  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state
    ApiManager.getAll("users", `email=${email}&password=${password}`) // check the database for match
      .then((user) => {
        console.log("user", user)
        if (user.length === 0) {  // no match
          window.alert("Email and password not valid. Please try again.")
        } else {  // we found the user in the db
          const userId = user[0].id
          localStorage.setItem("userId", parseInt(userId)) // set the user in local stoarge
            this.props.setUser({     // triggering the Chase.js SetUser() function
              email: email,
              password: password,
              userId: user[0].id
            })
            this.props.history.push('/checkin'); // lets start the fun!
        }
      });
  };
  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    return (
      <>
      <div style={styles.parent}>
        <FormControl component="fieldset">
          <FormGroup>
            <TextField
              id="email"
              label="Email"
              type="email"
              autoComplete="current-email"
              onChange={this.handleFieldChange}
            /><br />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleFieldChange}
            /><br />
            <Button variant="contained" color="secondary" style={styles.loginbutton} onClick={
              this.handleLogin
            }>
              Login
          </Button>
          </FormGroup>
        </FormControl>
      </div>
      </>
    )
  }
}

export default Login
