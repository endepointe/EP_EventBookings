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
        let fd = new FormData();
        Object.entries(state.data).map((item, idx) => {
          if (item[0] !== 'forms') {
            fd.append(item[0], item[1])
          } else {
            Object.entries(state.data.forms).map((pdf, idx) => {
              fd.append(pdf[0], pdf[1]);
            });
          }
        })

        for (var value of fd.values()) {
          console.log(value);
        }
        // 1. create a new hubspot user
        try {
          let hubspotResponse = await fetch(`${process.env.EXPRESS_API_HOST}/hubspot/create`, 
            {
              method: 'POST', 
              // headers: {
              //   'Content-Type': 'application/json',
              // },
              body: new URLSearchParams(fd) // JSON.stringify(state.data)
            });

          // create a test user. the hubspot user creation works
          try {
            let hubspotUser = await hubspotResponse.json();

            // test user
            // let hubspotUser = {
            //   id: 1234, 
            //   properties: {
            //     email: state.data.email, 
            //     phone: '1234567890',
            //     firstname: 'ftest',
            //     lastname: 'ltest',
            //   }
            // }

            //////////////////////
            // save to local db //
            //////////////////////

            //console.log('hubspotUser: ', hubspotUser);

            if (hubspotUser.properties.email) {
              let userData = {
                email: hubspotUser.properties.email,
              };

              // 3. Save user email to psql
              try {
                console.log(userData);
                let userResponse = await fetch(`${process.env.EXPRESS_API_HOST}/users/create`, 
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(userData),
                  }) 
                let newUser = await userResponse.json();
                console.log(newUser);
                if (!newUser.error) {
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