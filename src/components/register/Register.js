import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button';


export class Register extends Component {
  
  
  render() {
    return (
      <div>
        <FormControl component="fieldset">
          <FormGroup>

            <TextField required
              id="first"
              label="First Name"
            /><br />
            <TextField required
              id="last"
              label="Last Name"
            /><br />
            <TextField required
              id="age"
              label="Age"
              type="number"
            /><br />
<FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup aria-label="position" name="position" row>
        <FormControlLabel
          value="male"
          control={<Radio color="primary" />}
          label="Male"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="female"
          control={<Radio color="secondary" />}
          label="Female"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="other"
          control={<Radio color="default" />}
          label="Other"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender interested in</FormLabel>
      <RadioGroup aria-label="position" name="position" row>
        <FormControlLabel
          value="male"
          control={<Radio color="primary" />}
          label="Male"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="female"
          control={<Radio color="secondary" />}
          label="Female"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="other"
          control={<Radio color="default" />}
          label="Other"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
            <TextField required
              id="email"
              label="Email"
              type="email required"
            /><br />
            <TextField required
              id="password"
              label="Password"
              type="password"
            /><br />
            <TextField required
              id="password-again"
              label="Password again"
              type="password"
            /><br />
            <Button variant="contained" color="secondary" onClick={() => {
            this.props.history.push("/checkin")
          }}>
              Sign Up
          </Button>
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

export default Register
