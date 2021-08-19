import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const FormUserContactInfo = (props) => {

  const cont = e => {
    e.preventDefault();
    props.nextStep();
  };

  return (
    <>
      <TextField
        placeholder="Enter Your First Name"
        label="First Name"
        // onChange={props.handleChange('firstName')}
        defaultValue={props.state.firstName}
        margin="normal"
        fullWidth
      />
      <br />
      <TextField
        placeholder="Enter Your Last Name"
        label="Last Name"
        // onChange={props.handleChange('lastName')}
        defaultValue={props.state.lastName}
        margin="normal"
        fullWidth
      />
      <br />
      <TextField
        placeholder="Enter Your Email"
        label="Email"
        // onChange={props.handleChange('email')}
        defaultValue={props.state.email}
        margin="normal"
        fullWidth
      />
      <br />
      <Button
        color="primary"
        variant="contained"
        onClick={cont}
      >Continue</Button>
    </>
  );
}

export default FormUserContactInfo;