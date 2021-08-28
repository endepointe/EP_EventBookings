import React, { useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
// find a better icon to represent success
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

// display a success message and then send the user to their dashboard
const Success = ({ state, closeUserForm }) => {

  useEffect(() => {
    setTimeout(() => {
      // save user email to psql db for future login check
      console.log(state)
      closeUserForm();
    }, 2500);
  });

  return (
    <Grid container component={Box} justifyContent='center' mt={2} p={2}>
      <CheckCircleRoundedIcon/>
    </Grid>
  );
}

export default Success;