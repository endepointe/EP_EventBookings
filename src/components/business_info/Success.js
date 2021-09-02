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
    /*
    */
    ///*
    setTimeout(() => {
      // also save user data to psql db for future login check
      async function hs() {
        console.log(state.data)
        // 1st try
        try {
          let hubspotResponse = await fetch(`${process.env.EXPRESS_API_HOST}/hubspot/create`, 
            {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(state.data)
            });

          // 2nd try
          try {
            let hubspotUser = await hubspotResponse.json();

            console.log('hubspotUser: ', hubspotUser);

            if (hubspotUser.properties.email) {
              let userData = {
                email: hubspotUser.properties.email,
                phone: hubspotUser.properties.phone,
                fname: hubspotUser.properties.firstname,
                lname: hubspotUser.properties.lastname,
                hsID: hubspotUser.id
              };

              // 3rd try
              try {
                let stripeResponse = await fetch(`${process.env.EXPRESS_API_HOST}/stripe/customer/create`, 
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(userData),
                  }) 
                let stripeData = await stripeResponse.json();
                console.log(stripeData);
                if (stripeData.msg) {
                  closeUserForm();
                }
              } catch (err) { // 3rd catch
                console.error(err); 
              }
            }
          } catch(err) { // 2nd catch
            console.error(err); 
          }
        } catch (err) { // 1st catch
          console.error(err);
          return false;
        }
      }
      hs().then((res) => {
        if (res === true) {
          closeUserForm();    
        }  
      }) 
    }, 1800);
    //*/
    
  });

  return (
    <Grid container component={Box} justifyContent='center' mt={2} p={2}>
      <CheckCircleIcon className={classes.successIcon} />
    </Grid>
  );
}

export default Success;