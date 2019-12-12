import React, { Component} from 'react'
import ApiManager from '../../modules/ApiManager';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button';

export class EditProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    age: '',
    tagLine: '',
    gender: '',
    genderInterested: '',
    buttonDisabled: true
  };

  //*****************************************************************************************************
  // Handle Field Change
  //*****************************************************************************************************
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  };
  // Seperatly handling the radio buttons
  handleGenderChange = event => {
    this.setState({ gender: event.target.value });
  };
  handleGenderInterestedChange = event => {
    this.setState({ genderInterested: event.target.value });
  };
  //*****************************************************************************************************
  // Handle Save
  //*****************************************************************************************************
  handleSave = e => {
    //e.preventDefault()
    const { password, passwordB } = this.state
    if (password === passwordB && password !== "") {
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        gender: this.state.gender,
        genderInterested: this.state.genderInterested,
        email: this.state.email,
        password: this.state.password,
        ageRange: 0,
        tagLine: this.state.tagLine,
        avatarUrl: this.state.avatarUrl,
        barId: 0,
        drinkId: 0,
        chatId: 0,
        timeOut: false,
        beenReported: 1,
        chaserCoinCredit: 0
      }
      this.props.setUser({
        email: this.state.email,
        password: this.state.passwordA,
      })
      ApiManager.post("users", newUser)
        .then(() => {
          ApiManager.getLoggedInuser(this.state.email)
            .then((user) => {
              // console.log('user registration', user)
              const userId = user[0].id
              localStorage.setItem("userId", parseInt(userId))
            })
        })
        .then(() => {
          this.props.history.push("/checkin")
        })
    }
    else {
      window.alert("Please make sure your passwords match")
    }
  }

  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    const { selected } = this.state;
    const { firstName, lastName, age, tagLine, gender, genderInterested } = this.state;
    const isEnabled = firstName.length !=="" && lastName.length!=="" && age.length!=="" && tagLine.lenght!=="" && gender.lenght!=="" && genderInterested!==""

    return (
      <div>
        <FormControl component="fieldset">
          <FormGroup>
            <TextField required
              id="firstName"
              label="First Name"
              onChange={this.handleFieldChange}
            /><br />
            <TextField required
              id="lastName"
              label="Last Name"
              onChange={this.handleFieldChange}
            /><br />
            <TextField required
              id="age"
              label="Age"
              type="number"
              onChange={this.handleFieldChange}
            /><br />
            <TextField required
              id="tagLine"
              label="Tagline"
              type="text"
              onChange={this.handleFieldChange}
            /><br />
            <FormControl component="fieldset" name="gender">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                id="gender"
                aria-label="position"
                name="gender"
                onChange={this.handleGenderChange}
                value={selected}
                row>
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

            <FormControl component="fieldset" name="genderInterested">
              <FormLabel component="legend">Interested in</FormLabel>
              <RadioGroup
                id="genderInterested"
                aria-label="position"
                name="genderInterested"
                onChange={this.handleGenderInterestedChange}
                value={selected}
                row>
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
            </FormControl> <br />

            <Button disabled={!isEnabled} variant="contained" color="secondary"
              onClick={() => {
                this.handleSave()
              }}>
              SAVE
          </Button>
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

export default EditProfile
