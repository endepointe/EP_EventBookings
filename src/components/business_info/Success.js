import React, { useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
  },
  successIcon: {
    color: 'green',
    width: '100px',
    height: '100px',
  }
}));

const Success = ({ state, closeUserForm }) => {
  const classes = useStyles();

  useEffect(() => {

    // use the status of hubspot save to determine success icon 
    // on future iterations of application.

    setTimeout(() => {
      // also save user data to psql db for future login check
      async function hs() {
        console.log(state.data)
        try {
          let hubspotResponse = await fetch(`${process.env.EXPRESS_API_HOST}/hubspot/create`, 
            {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(state.data)
            });
          console.log(hubspotResponse);
        } catch (err) {
          console.error(err);
        }
      }
      hs();
      closeUserForm();
    }, 1800);

    
  }, []);

  return (
    <Grid container component={Box} justifyContent='center' mt={2} p={2}>
      <CheckCircleIcon className={classes.successIcon} />
    </Grid>
  );
}

export default Success;