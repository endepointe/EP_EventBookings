/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {
  IconButton,
  Typography,
  Grid
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {CardElement} from '@stripe/react-stripe-js';
// import './Styles.css'

const useStyles = makeStyles({
  // root style works due to the width setting in <CheckoutDrawer.
  // If the widh setting were missing in CheckoutDrawer, the width
  // here would have to be set to a static value. 
  root: {
    width: '100vw',
    maxWidth: 450, // must be <= width in CheckoutDrawer
  },
  cardElement: {
    height: '40px',
    padding: '10px 12px',
    color: '#32325d',
    backgroundColor: 'white',
    border: '1px solid transparent',
    borderRadius: '4px',
    boxShadow: '0 1px 3px 0 #e6ebf1',
    webkitTransition: 'box-shadow 150ms ease',
    transition: 'box-shadow 150ms ease',
    '&:focus': {
      boxShadow: '0 1px 3px 0 #cfd7df',
    },
    '&:invalid': {
      borderColor: '#fa755a', 
    },
    '&:webkit-autofill': {
      backgroundColor: '#fefde5 !important'
    }
  }
})

// error object is made available to provide user feedback.
function CardSection() {
  const classes = useStyles();

  return (
    <Grid container 
      justifyContent='center'
      className={classes.root}>
      <Grid item xs={11}>
        <label>
          <Typography variant='body1'>Card details</Typography>
          <CardElement className={classes.cardElement} />
        </label>
      </Grid>
    </Grid>
  );
};
export default CardSection;