import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class Login extends Component {
  state = {
		email: '',
		password: ''
  };
  
  handleFieldChange = (e) => {
		const stateToChange = {};
		stateToChange[e.target.id] = e.target.value;
		this.setState(stateToChange);
  };
  
  handleLogin = (e) => {
		e.preventDefault();
		const { email, password } = this.state
		ApiManager.getAll("users", `email=${email}&password=${password}`)
		.then((user) => {
			// console.log('user login test', user)
			if (user.length > 0){
				this.props.setUser({
					email: email,
					password: password,
					userId: user[0].id
				});
				const userId = user[0].id
				localStorage.setItem("userId", parseInt(userId))
				this.props.history.push('/checkin');
			} else {
				window.alert("Email and password not valid. Please try again")
			}
		});
	};

  render() {
    return (
      <div>
        <h1>Login</h1>
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
          <Button variant="contained" color="secondary" onClick={
            this.handleLogin
          }>
           Login
          </Button>
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

export default Login
