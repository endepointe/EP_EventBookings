import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import {
//   IconButton,
//   Typography,
//   Grid
// } from '@material-ui/core';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${process.env.STRIPE_PK_TEST}`);

const useStyles = makeStyles({
  root: {
    flexGrow: 1, 
    color: 'rgb(90,90,90)'
  },
  list: {
    width: '90%',
    maxWidth: 450,
  }
});


// replace redish background with a stop icon

export default function CheckoutDrawer(props) {
  const classes = useStyles();

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.handeCheckoutDrawer}
      onKeyDown={props.handleCheckoutDrawer}
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor='right'
        open={props.open}
        onClose={props.handleCheckoutDrawer}
        onOpen={props.handleCheckoutDrawer}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}