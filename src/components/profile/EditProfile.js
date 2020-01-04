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

loggedInUserId() { return parseInt(sessionStorage.getItem("userId")) }

  state = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    age: '',
    tagLine: '',
    gender: '',
    genderInterested: '',
    loadingStatus: true,
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
//******************************************************************************
//UPDATE existing profile
//******************************************************************************
updateExistingProfile = () => {
    // e.preventDefault()
  this.setState({ loadingStatus: true });
  const editedProfile = {
    id: this.state.id,
    // userId: this.loggedInUserId(),  <---- REDUNDANCY
    firstName: this.state.firstName, 
    lastName: this.state.lastName,
    age: this.state.age,
    tagLine: this.state.tagLine,
    gender: this.state.gender,
    genderInterested: this.state.genderInterested,
  };

  ApiManager.update("users", (editedProfile)) // API PUT call
    .then(() => {
      this.props.history.goBack()
     }) // Go back to the last view

}

//******************************************************************************
//componentDidMount()
//******************************************************************************
componentDidMount() {
  ApiManager.get("users", this.loggedInUserId())
  .then(user => {
      this.setState({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        tagLine: user.tagLine,
        gender: user.gender,
        genderInterested: user.genderInterested,
        loadingStatus: false,
      })
    })}


  //*****************************************************************************************************
  // Render()
  //*****************************************************************************************************
  render() {
    const { firstName, lastName, age, tagLine, gender, genderInterested } = this.state;
    const isEnabled = firstName !=="" && lastName !=="" && age !=="" && tagLine !=="" && gender !=="" && genderInterested!==""

    return (
      <div>
        <FormControl component="fieldset">
          <FormGroup>
            <TextField required
              id="firstName"
              label="First Name"
              value ={this.state.firstName}
              onChange={this.handleFieldChange}
            /><br />
            <TextField required
              id="lastName"
              label="Last Name"
              value ={this.state.lastName}
              onChange={this.handleFieldChange}
            /><br />
            <TextField required
              id="age"
              label="Age"
              type="number"
              value ={this.state.age}
              onChange={this.handleFieldChange}
            /><br />
            <TextField required
              id="tagLine"
              label="Tagline"
              type="text"
              value ={this.state.tagLine}
              onChange={this.handleFieldChange}
            /><br />
            <FormControl component="fieldset" name="gender">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                id="gender"
                aria-label="position"
                name="gender"
                onChange={this.handleGenderChange}
                value ={this.state.gender}
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
                value ={this.state.genderInterested}
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
                this.updateExistingProfile()
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
