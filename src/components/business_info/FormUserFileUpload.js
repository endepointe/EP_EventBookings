import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const FormUserFileUpload = (props) => {

  return (
    <>
      <TextField
        placeholder="Enter Your Occupation"
        label="Occupation"
        // onChange={props.handleChange('occupation')}
        // defaultValue={props.state.occupation}
        margin="normal"
        fullWidth
      />
      <br />
      <TextField
        placeholder="Enter Your City"
        label="City"
        // onChange={props.handleChange('city')}
        // defaultValue={props.state.city}
        margin="normal"
        fullWidth
      />
      <br />
      <TextField
        placeholder="Enter Your Bio"
        label="Bio"
        // onChange={props.handleChange('bio')}
        // defaultValue={props.state.bio}
        margin="normal"
        fullWidth
      />
      <br />

      <Button
        color="secondary"
        variant="contained"
        // onClick={back}
      >Back</Button>

      <Button
        color="primary"
        variant="contained"
        // onClick={cont}
      >Continue</Button>
    </>
  );
}

export default FormUserFileUpload;