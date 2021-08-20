import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

const Confirm = (props) => {
  const cont = e => {
    e.preventDefault();
    // PROCESS FORM //
    props.nextStep();
  };

  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <>
      <List>
        <ListItem>
          <ListItemText primary="First Name" secondary={props.state.firstName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Last Name" secondary={props.state.lastName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={props.state.email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Occupation" secondary={props.state.occupation} />
        </ListItem>
        <ListItem>
          <ListItemText primary="City" secondary={props.state.city} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Bio" secondary={props.state.bio} />
        </ListItem>
      </List>
      <br />

      <Button
        color="secondary"
        variant="contained"
        onClick={back}
      >Back</Button>

      <Button
        color="primary"
        variant="contained"
        onClick={cont}
      >Confirm & Continue</Button>
    </>
  );
}

export default Confirm;